const express = require("express");
const router = express.Router();

const {  getArticles,
  getArticleById, } = require("../controller/articleController");

router.get("/", getArticles);

router.get("/:id", getArticleById);

module.exports = router;

