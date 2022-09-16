const express = require('express');
const router = express.Router();
const { createNotification, getAllNotification ,putNotification} = require('./notifications.services.js');

router.post("/", createNotification )
router.put("/", putNotification )
router.get("/", getAllNotification )


module.exports = router;