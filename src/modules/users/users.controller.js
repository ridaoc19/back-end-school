const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { createUser, getAll, getPassword } = require("./users.services.js");
=======
const { createUser, getAll, getPassword, precarga } = require("./users.services.js");
>>>>>>> develop

router.post("/", createUser )
router.get("/", getAll )
router.get("/password", getPassword )
<<<<<<< HEAD

=======
router.post("/precarga", precarga)
>>>>>>> develop


module.exports = router;