const productRouter = require("./product")
const storeRouter = require("./store")
const userRouter = require("./user")
const authRouter= require("./auth")

function routes(app){
    // config cors
    app.use("/products", productRouter)
    app.use("/stores", storeRouter)
    app.use("/users", userRouter)
    app.use("/auth", authRouter)
}

module.exports = routes
