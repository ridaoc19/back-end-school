const express = require('express');
const router = express.Router();
const Course = require("./course.models.js")

router.get("/", (req, res) => {
    res.json("hola")
})

module.exports = router;