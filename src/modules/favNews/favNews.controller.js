const express = require('express');
const router = express.Router();
const { addFavNews, getAllFavNews } = require('./favNews.services.js');

router.post("/", addFavNews )
router.get("/", getAllFavNews )

module.exports = router;