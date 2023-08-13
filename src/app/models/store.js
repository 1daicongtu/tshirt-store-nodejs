const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Store = new Schema({
    idStore: {type: Number, required: true},
    storeName: {type: String, required: true},
    address: {type: String},
    tel: {type: String, required: true},
    email: {type: String, required: true},
    rating: {type: Number},
    reviewCount: {type: Number},
    schedule: [
        new Schema({
            dayOfWeek: String,
            openTime: String,
            closeTime: String
        }, {_id: false})
    ],
    social: {
        fb: String,
        tw: String,
        pr: String,
        yt: String,
        ig: String
    },
    logoURL: String,
    backgroudURL: String,
    isFurtured: Boolean
})

module.exports = mongoose.model("Store", Store)