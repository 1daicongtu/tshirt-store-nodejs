
const express= require("express")
const router = express.Router()
const cartController = require("../app/controllers/CartControllers")


router.post("/add-many", cartController.addMany)
router.delete("/delete-one", cartController.deleteOne)
router.patch("/update-quantity", cartController.updateQuantityOfItemCart)
router.get("/get-all-by-userID", cartController.getCartListByUserID)
router.post("/add-one", cartController.addOne);
module.exports = router;