const express = require('express');
const router = express.Router();
const { createNews, getAllNews } = require('./news.services.js');

router.post("/", createNews )
router.get("/", getAllNews )

module.exports = router;