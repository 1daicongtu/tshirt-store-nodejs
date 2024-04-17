const express = require("express")
const router = express.Router()

const WishlistControllers = require("../app/controllers/WishlistControllers.js")

router.post("/add-many", WishlistControllers.addMany)
router.post("/add-one", WishlistControllers.addOne)
router.delete("/", WishlistControllers.deleteOne)
router.get("/get-all-by-userID", WishlistControllers.getAll)

module.exports = router;