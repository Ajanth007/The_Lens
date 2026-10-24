const { pool } = require("../db");

const getArticles = async (req, res) => {
  try {
    const {
      category,
      search,
      sort = "newest",
      limit = 12,
      page = 1,
      featured = false,
    } = req.query;

    let query = `
      SELECT a.*, auth.name as author_name, auth.initials, auth.avatar_bg, auth.avatar_text, 
             auth.accent_color,
             COUNT(*) OVER() as total_count
      FROM articles a
      JOIN authors auth ON a.author_id = auth.id
    `;
    const params = [];
    const whereClauses = [];
    const orderBy = [];

    if (featured === "true") {
      whereClauses.push("a.featured = true");
    }

    if (category) {
      whereClauses.push("a.category = ?");
      params.push(category);
    }

    if (search) {
      whereClauses.push("(a.title LIKE ? OR a.excerpt LIKE ?)");
      params.push(`%${search}%`, `%${search}%`);
    }

    if (whereClauses.length) {
      query += " WHERE " + whereClauses.join(" AND ");
    }

    // Sorting
    switch (sort) {
      case "oldest":
        orderBy.push("a.publish_date ASC");
        break;
      case "readtime_asc":
        orderBy.push(
          'CAST(SUBSTRING(a.read_time, 1, LOCATE(" ", a.read_time)-1) AS UNSIGNED) ASC',
        );
        break;
      case "readtime_desc":
        orderBy.push(
          'CAST(SUBSTRING(a.read_time, 1, LOCATE(" ", a.read_time)-1) AS UNSIGNED) DESC',
        );
        break;
      default:
        orderBy.push("a.publish_date DESC");
    }
    query += " ORDER BY " + orderBy.join(", ");

    const offset = (page - 1) * limit;
    query += " LIMIT ? OFFSET ?";
    params.push(parseInt(limit), parseInt(offset));

    const [rows] = await pool.execute(query, params);

    res.json({
      articles: rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: rows[0]?.total_count || 0,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch articles" });
  }
};

const getArticleById = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `
      SELECT a.*, auth.name as author_name, auth.initials, auth.role, auth.bio,
             auth.avatar_bg, auth.avatar_text, auth.accent_color
      FROM articles a
      JOIN authors auth ON a.author_id = auth.id
      WHERE a.id = ?
    `,
      [req.params.id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch article" });
  }
};

module.exports = {
  getArticles,
  getArticleById,

};

