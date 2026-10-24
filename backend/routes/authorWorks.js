const express = require("express");
const router = express.Router();

const requireAuth = require("../middleware/authMiddleware");

const {
  getMyArticles,
  getMyArticleById,
  updateMyArticle,
  deleteMyArticle,
} = require("../controller/authorArticleController");

router.use(requireAuth);

router.get("/articles", getMyArticles);
router.get("/articles/:id", getMyArticleById);
router.put("/articles/:id", updateMyArticle);
router.delete("/articles/:id", deleteMyArticle);

module.exports = router;