const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ObjectId = Schema.Types.ObjectId

const subImageSchema = new Schema({
    public_id: String,
    url: String
}, { _id: false })

const Comment = new Schema({
    productID: {type: Number, required: true},
    rating: {type: Number, required: true},
    comment: {type: String, required: true},
    date: {type: Date, default: Date.now},
    name: {type: String, required: true},
    email: {type: String, required: true},
    userID: {type: ObjectId, default: null},
    images: [
        subImageSchema
    ]
})

module.exports = mongoose.model("Comment", Comment)