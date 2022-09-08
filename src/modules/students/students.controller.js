const express = require('express');
const router = express.Router();
const { createUser, getAll, putStudent, deleteStudent } = require("./students.service");

// router.post("/", createUser );
// router.get("/", getAll );
router.put("/", putStudent)
router.put("/delete", deleteStudent)


module.exports = router;