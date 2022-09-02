const express = require('express');
const router = express.Router();
const { createUser, getAll, getOTRO } = require("./users.services.js");

router.post("/", createUser )
router.get("/", getAll )
router.get("/o", getOTRO )


module.exports = router;