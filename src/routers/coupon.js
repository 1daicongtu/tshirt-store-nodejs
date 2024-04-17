const express = require('express');
const router = express.Router();

const CouponController = require("../app/controllers/CouponController.js")

router.get("/", CouponController.getAllCouponNotExpired);

module.exports = router;

