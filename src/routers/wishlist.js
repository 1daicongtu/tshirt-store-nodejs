const express = require("express")
const router = express.Router()

const {
    addMany,
    addOne,
    deleteOne,
    getAll
} = require("../app/controllers/WishlistControllers.js")

router.post("/add-many", addMany)
router.post("/add-one", addOne)
router.delete("/", deleteOne)
router.get("/get-all-by-userID", getAll)

module.exports = router;