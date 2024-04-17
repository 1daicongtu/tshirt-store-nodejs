const mongoose = require("mongoose");
require('dotenv').config()

async function connect(){
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Connect Successfully!")
    } catch (error) {
        console.log("Connection Failed!")
    }
}

module.exports = {connect}