
const { pool } = require("../db");

const WORDS_PER_MINUTE = 225;

const LIST_COLUMNS = `
  id, title, slug, excerpt, category, publish_date, read_time,
  image_color, gradient, featured, views, created_at, updated_at
`;

const isId = (v) => /^\d+$/.test(v);

const calcReadTime = (content) => {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))} min`;
};

// GET /me/articles
const getMyArticles = async (req, res) => {
  try {
    const [authors] = await pool.execute(
      `SELECT id, name, initials, role, bio, avatar_bg, avatar_text,
              accent_color, location, joined_year
       FROM authors
       WHERE id = ?`,
      [req.user.id]
    );

    if (authors.length === 0) {
      return res.status(404).json({ message: "Author not found" });
    }

    const [articles] = await pool.execute(
      `SELECT ${LIST_COLUMNS}
       FROM articles
       WHERE author_id = ?
       ORDER BY publish_date DESC, id DESC`,
      [req.user.id]
    );

    res.json({
      author: authors[0],
      articles,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load your articles" });
  }
};



// GET /api/authors/me/articles/:id
const getMyArticleById = async (req, res) => {
  if (!isId(req.params.id)) {
    return res.status(400).json({ message: "Invalid article id" });
  }

  try {
    const [rows] = await pool.execute(
      `SELECT ${LIST_COLUMNS}, content
       FROM articles
       WHERE id = ? AND author_id = ?`,
      [req.params.id, req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load the article" });
  }
};

// PUT /api/authors/me/articles/:id
const updateMyArticle = async (req, res) => {
  if (!isId(req.params.id)) {
    return res.status(400).json({ message: "Invalid article id" });
  }

  const title = String(req.body.title ?? "").trim();
  const category = String(req.body.category ?? "").trim();
  const excerpt = String(req.body.excerpt ?? "").trim();
  const content = String(req.body.content ?? "").trim();

  if (!title || title.length > 500) {
    return res.status(400).json({
      message: "Title is required (max 500 characters).",
    });
  }

  if (!category || category.length > 100) {
    return res.status(400).json({
      message: "Category is required (max 100 characters).",
    });
  }

  if (excerpt.length > 1000) {
    return res.status(400).json({
      message: "Excerpt is too long (max 1000 characters).",
    });
  }

  if (!content) {
    return res.status(400).json({
      message: "Content is required.",
    });
  }

  try {
    const [result] = await pool.execute(
      `UPDATE articles
       SET title = ?, excerpt = ?, category = ?, content = ?, read_time = ?
       WHERE id = ? AND author_id = ?`,
      [
        title,
        excerpt || null,
        category,
        content,
        calcReadTime(content),
        req.params.id,
        req.user.id,
      ]
    );

    // Check whether the article exists and belongs to this author.
    if (result.affectedRows === 0) {
      const [rows] = await pool.execute(
        `SELECT id FROM articles
         WHERE id = ? AND author_id = ?`,
        [req.params.id, req.user.id]
      );

      if (rows.length === 0) {
        return res.status(404).json({
          message: "Article not found",
        });
      }
    }

    const [rows] = await pool.execute(
      `SELECT ${LIST_COLUMNS}
       FROM articles
       WHERE id = ? AND author_id = ?`,
      [req.params.id, req.user.id]
    );

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to update the article",
    });
  }
};

// DELETE /api/authors/me/articles/:id
const deleteMyArticle = async (req, res) => {
  if (!isId(req.params.id)) {
    return res.status(400).json({ message: "Invalid article id" });
  }

  try {
    const [result] = await pool.execute(
      `DELETE FROM articles
       WHERE id = ? AND author_id = ?`,
      [req.params.id, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    return res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to delete the article",
    });
  }
};

module.exports = {
  getMyArticles,
  getMyArticleById,
  updateMyArticle,
  deleteMyArticle,
};