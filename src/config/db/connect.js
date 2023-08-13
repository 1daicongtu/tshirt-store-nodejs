const mongoose = require("mongoose");

async function connect(){
    try {
        await mongoose.connect("mongodb://localhost:27017/tshirtstore", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Connect Successfully!")
    } catch (error) {
        console.log("Connection Failed!")
    }
}

module.exports = {connect}