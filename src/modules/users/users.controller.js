const express = require('express');
const router = express.Router();
const { createUser, getAll, getPassword, putUser, deleteUser, getGoogle } = require("./users.services.js");

router.post("/", createUser )
router.get("/", getAll )
router.get("/password", getPassword )
router.put("/", putUser)
router.put("/delete/:idUser", deleteUser)
router.get("/google", getGoogle)


module.exports = router;