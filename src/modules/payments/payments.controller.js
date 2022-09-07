const express = require('express');
const router = express.Router();
const { newPayment } = require("./payments.service");

router.post("/", newPayment );

module.exports = router;