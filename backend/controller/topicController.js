const { pool } = require("../db");

const getTopic = async (req, res) => {
  try {
    const [topics] = await pool.execute(`
      SELECT t.*, 
             COALESCE(COUNT(a.id), 0) as article_count
      FROM topics t
      LEFT JOIN articles a ON JSON_EXTRACT(a.category, '$') = t.name
      GROUP BY t.id
      ORDER BY t.name
    `);

    res.json(topics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch topics" });
  }
};

const getSpecificTopic = async (req, res) => {
  try {
    const topicName =
      req.params.id === "technology"
        ? "Technology"
        : req.params.id === "culture"
          ? "Culture"
          : req.params.id.charAt(0).toUpperCase() + req.params.id.slice(1);

    const { limit = 5, sort = "newest" } = req.query;

    let query = `
      SELECT a.*, auth.name as author_name
      FROM articles a
      JOIN authors auth ON a.author_id = auth.id
      WHERE a.category = ?
    `;
    const params = [topicName];

    let orderBy = "a.publish_date DESC";
    if (sort === "oldest") orderBy = "a.publish_date ASC";

    query += ` ORDER BY ${orderBy} LIMIT ?`;
    params.push(parseInt(limit));

    const [rows] = await pool.execute(query, params);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch topic articles" });
  }
};

module.exports = {
  getSpecificTopic,
  getTopic,
};
