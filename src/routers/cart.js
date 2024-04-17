
const express= require("express")
const router = express.Router()
const {
    addOne,
    addMany,
    deleteOne,
    updateQuantityOfItemCart,
    getCartListByUserID
} = require("../app/controllers/CartControllers.js")


router.post("/add-many", addMany)
router.delete("/delete-one", deleteOne)
router.patch("/update-quantity", updateQuantityOfItemCart)
router.get("/get-all-by-userID", getCartListByUserID)
router.post("/add-one", addOne);

module.exports = router;