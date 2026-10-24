const {pool} = require("../db")

const getAuthors = async (req, res) => {
  try {
    const {
      search,
      sort = 'name',
      limit = 20,
      page = 1
    } = req.query;

    let query = `
      SELECT a.*, 
             COALESCE(COUNT(art.id), 0) as article_count,
             COALESCE(SUM(art.views), 0) as total_views
      FROM authors a
      LEFT JOIN articles art ON a.id = art.author_id
    `;
    const params = [];
    const groupBy = ['a.id'];
    const whereClauses = [];

    if (search) {
      whereClauses.push('(a.name LIKE ? OR a.role LIKE ? OR a.bio LIKE ?)');
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (whereClauses.length) {
      query += ' WHERE ' + whereClauses.join(' AND ');
    }

    query += ' GROUP BY ' + groupBy.join(', ');

    // Sorting
    let orderBy = 'a.name ASC';
    if (sort === 'articles_desc') orderBy = 'article_count DESC';
    if (sort === 'views_desc') orderBy = 'total_views DESC';
    if (sort === 'joined') orderBy = 'a.joined_year ASC';

    query += ` ORDER BY ${orderBy}`;

    const offset = (page - 1) * limit;
    query += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [rows] = await pool.execute(query, params);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch authors' });
  }
}

const specificAuthors = async (req, res) => {
  try {
    const [author] = await pool.execute(
      `SELECT * FROM authors WHERE id = ?`,
      [req.params.id]
    );

    if (author.length === 0) {
      return res.status(404).json({ error: 'Author not found' });
    }

    const [articles] = await pool.execute(`
      SELECT a.id, a.title, a.category, a.excerpt, a.publish_date, a.read_time
      FROM articles a 
      WHERE a.author_id = ?
      ORDER BY a.publish_date DESC
      LIMIT 5
    `, [req.params.id]);

    res.json({
      ...author[0],
      recent_articles: articles
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch author' });
  }
}


module.exports ={
    getAuthors,specificAuthors
}