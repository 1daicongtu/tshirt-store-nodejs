const mongoose = require("mongoose")

const Schema = mongoose.Schema

const Wishlist = new Schema({
    userID: {type: Schema.Types.ObjectId, required: true},
    wishlists: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
})
Wishlist.index({userID: 1}, {unique: true})

module.exports = mongoose.model("Wishlist", Wishlist)