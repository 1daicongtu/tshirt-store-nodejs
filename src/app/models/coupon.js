const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Coupon = new Schema({
    code: {type: String, required: true, unique: true},
    discount: {type: Number, required: true},
    discountType: {type: String, required: true}, // percent or money or ship fee (money)
    description: {type: String, required: true},
    endDate: {type: Date}, // null is forever
    isEnabled: {type: Boolean, required: true, default: true},
})

module.exports = mongoose.model("Coupon", Coupon)