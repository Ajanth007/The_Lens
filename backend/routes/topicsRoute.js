const express = require("express");
const router = express.Router();
const { getSpecificTopic, getTopic } = require("../controller/topicController");

router.get("/",getTopic);

router.get("/:id/articles", getSpecificTopic);

module.exports = router;
