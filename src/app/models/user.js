const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")
const saltRounds = 10

const User = new Schema({
    username: {type: String, required: true, unique: true},
    password: {required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true}, 
    password: {type: String, required: true},
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
    role: {type: String, default: "user", enum: ["user", "admin"]}
})


User.pre("save", function(next){
    if (!this.isModified("password") || !this.isNew) return next();

    this.updateAt = Date.now()

    bcrypt.hash(this.password, saltRounds, (err, hash) => {
        if (err) return next(err)

        this.password = hash
        next()
    })

})

module.exports = mongoose.model("User", User)