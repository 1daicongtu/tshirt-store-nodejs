const express = require('express');
const router = express.Router();

const {
    getAllCouponNotExpired
} = require("../app/controllers/CouponController.js")

router.get("/", getAllCouponNotExpired);

module.exports = router;

