const Coupon = require("../models/coupon")

class CouponController {
    async getAllCouponNotExpired(req, res, next){
        try {
            
            const resultQuery = await Coupon.find({
                $or: [
                    {endDate: {$exists: true, $eq: null}},
                    {endDate: {$exists: true, $gte: new Date()}}
                ]
            }).lean();
            return res.status(200).json(resultQuery);
        } catch(err){
            console.log(err);
            return res.status(500).json("Internal Server Error");
        }
    }
}

module.exports = new CouponController()