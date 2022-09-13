const express = require('express');
const router = express.Router();
const { newPayment, stripe } = require("./payments.service");

router.post("/", newPayment );
router.post("/stripe", stripe)

module.exports = router;