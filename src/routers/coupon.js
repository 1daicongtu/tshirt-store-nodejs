const express = require('express');
const router = express.Router();

const CouponController = require("../app/controllers/CouponController")

router.get("/", CouponController.getAllCouponNotExpired);

module.exports = router;

