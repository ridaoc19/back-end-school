const express = require('express');
const router = express.Router();
const { createUser, getAll, getPassword, precarga } = require("./users.services.js");

router.post("/", createUser )
router.get("/", getAll )
router.get("/password", getPassword )
router.post("/precarga", precarga)


module.exports = router;