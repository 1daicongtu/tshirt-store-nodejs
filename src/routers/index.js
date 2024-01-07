const productRouter = require("./product")
const storeRouter = require("./store")
const userRouter = require("./user")
const authRouter= require("./auth")
const commentRouter = require("./comment")
const cartRouter = require("./cart")
const wishlistRouter = require("./wishlist")
const compareRouter = require("./compare")
const contactRouter = require("./contact")
const coupon = require("./coupon")

function routes(app){
    
    app.use("/products", productRouter)
    app.use("/stores", storeRouter)
    app.use("/users", userRouter)
    app.use("/auth", authRouter)
    app.use("/comments", commentRouter)
    app.use("/cart", cartRouter)
    app.use("/wishlist", wishlistRouter)
    app.use("/compare", compareRouter)
    app.use("/contact", contactRouter)
    app.use("/coupons", coupon)
}

module.exports = routes
