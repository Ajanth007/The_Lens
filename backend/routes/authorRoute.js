const express = require('express');
const router = express.Router();
const { 
    getAuthors,specificAuthors } = require('../controller/authorsController');

router.get('/', getAuthors);

router.get('/:id', specificAuthors);

module.exports = router;

