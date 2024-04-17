const productRouter = require("./product.js")
const storeRouter = require("./store.js")
const userRouter = require("./user.js")
const authRouter= require("./auth.js")
const commentRouter = require("./comment.js")
const cartRouter = require("./cart.js")
const wishlistRouter = require("./wishlist.js")
const compareRouter = require("./compare.js")
const contactRouter = require("./contact.js")
const coupon = require("./coupon.js")

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
