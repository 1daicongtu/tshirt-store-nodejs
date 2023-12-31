const mongoose = require("mongoose")
const Schema = mongoose.Schema


const Contact = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    massage: {type: String, required: false},
})

module.exports = mongoose.model("Contact", Contact)