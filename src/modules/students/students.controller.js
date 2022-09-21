const express = require('express');
const router = express.Router();
const { createUser, getAllStudents, getAllStudentsIdNotification, putStudent, deleteStudent , putStudentActDes, getStudentsCourse} = require("./students.service");

// router.post("/", createUser );
router.get("/all", getAllStudents );
router.get("/", getStudentsCourse );
router.get("/idNotifications/:IdNotifications", getAllStudentsIdNotification );
router.put("/", putStudent)
router.put("/ActDes", putStudentActDes)
router.put("/delete", deleteStudent)


module.exports = router;