const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Product = new Schema({
    productID: {type: Number, required: true},
    productName: {type: String, required: true},
    descriptionShort: String,
    descriptionLong: String,
    costLowest: Number,
    costHighest: Number,
    isSale: Boolean,
    size: [String],
    storeIMG: String,
    storeID: Number,
    SKU: String,
    category: [String],
    tag: [String],
    listProduct: [
        new Schema({
            color: String,
            type: [
                new Schema({
                    typeName: String,
                    imageToShow: {
                        front: String,
                        back: String
                    },
                    imageSmall: {
                        front: String,
                        back: String
                    },
                    price: Number
                }, {_id: false})
            ]
        }, {_id: false})

    ]
})

module.exports = mongoose.model("Product", Product)