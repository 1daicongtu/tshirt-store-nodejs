const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductDetailSelected = new Schema({
    imageSmall : new Schema({
        back: String,
        front: String,
    }, { _id: false }),
    imageToShow: new Schema({
        back: String,
        front: String,

    }, { _id: false }),
    price: Number,
    typeName: String    
}, { _id: false })

const Cart = new Schema({
    userID: {type: Schema.Types.ObjectId, required: true},
    productID: {type: Number, required: true},
    productName: {type: String, required: true},
    colorSelected: {type: String, required: true},
    sizeSelected: {type: String, required: true},
    quantity: {type: Number, required: true},
    productDetailSelected: ProductDetailSelected
})


module.exports = mongoose.model("Cart", Cart)