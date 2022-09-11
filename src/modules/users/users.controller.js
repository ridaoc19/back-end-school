const express = require('express');
const router = express.Router();
const { createUser, getAll, getPassword, putUser, deleteUser, getGoogle, resetPassword } = require("./users.services.js");

router.post("/", createUser )
router.get("/", getAll )
router.put("/", putUser)
router.put("/delete/:idUser", deleteUser)
router.get("/password", getPassword )
router.put("/password", resetPassword )
router.get("/google", getGoogle)


module.exports = router;