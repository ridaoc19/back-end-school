const express = require('express');
const router = express.Router();
const { createUser, getAll, getPassword, putUser, deleteUser, getGoogle, resetPassword } = require("./users.services.js");

router.post("/", createUser )
router.get("/", getAll )
router.put("/", putUser)
router.put("/delete/:idUser", deleteUser)
router.post("/password", getPassword )
router.put("/password", resetPassword )



module.exports = router;