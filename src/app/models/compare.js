const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Compare = new Schema({
    userID: {type: Schema.Types.ObjectId, required: true},
    listCompare: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    createdAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now}

})

Compare.pre("save", function(next) {
    this.updateAt = Date.now()
    next()
})

Compare.index({userID: 1}, {unique: true})

module.exports = mongoose.model("Compare", Compare)