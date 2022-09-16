const express = require('express');
const router = express.Router();
const {getAllTypeUsers} = require('./typeUsers.service');

router.get("/", getAllTypeUsers)


module.exports = router;