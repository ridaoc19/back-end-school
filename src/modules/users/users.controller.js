const express = require('express');
const router = express.Router();
const { createUser, getAll, getPassword, putUser, deleteUser } = require("./users.services.js");

router.post("/", createUser )
router.get("/", getAll )
router.get("/password", getPassword )
router.put("/", putUser)
router.put("/delete/:idUser", deleteUser)


module.exports = router;