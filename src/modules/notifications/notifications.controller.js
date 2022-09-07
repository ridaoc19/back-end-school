const express = require('express');
const router = express.Router();
const { createNotification, getAllNotification } = require('./notifications.services.js');

router.post("/", createNotification )
router.get("/", getAllNotification )

module.exports = router;