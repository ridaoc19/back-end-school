const express = require('express');
const router = express.Router();
const { createUser, getAll, getPassword } = require("./users.services.js");

router.post("/", createUser )
router.get("/", getAll )
router.get("/password", getPassword )



module.exports = router;