const express = require('express');
const router = express.Router();
const { createUser, getAllStudents, getAllStudentsIdNotification, putStudent, deleteStudent , putStudentActDes} = require("./students.service");

// router.post("/", createUser );
router.get("/", getAllStudents );
router.get("/idNotifications/:IdNotifications", getAllStudentsIdNotification );
router.put("/", putStudent)
router.put("/ActDes", putStudentActDes)
router.put("/delete", deleteStudent)


module.exports = router;