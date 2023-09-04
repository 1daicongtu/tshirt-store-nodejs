const productRouter = require("./product")
const storeRouter = require("./store")
const userRouter = require("./user")
const authRouter= require("./auth")
const commentRouter = require("./comment")
const cartRouter = require("./cart")
const wishlistRouter = require("./wishlist")

function routes(app){
    // config cors
    app.use("/products", productRouter)
    app.use("/stores", storeRouter)
    app.use("/users", userRouter)
    app.use("/auth", authRouter)
    app.use("/comments", commentRouter)
    app.use("/cart", cartRouter)
    app.use("/wishlist", wishlistRouter)
}

module.exports = routes
