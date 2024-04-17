const express = require('express');
const router = express.Router();

const {
    addOne,
    addMany,
    getCompareByUserID,
    removeOneByUserIdAndProductId,
    removeAllByUserID
} = require("../app/controllers/CompareControllers.js")

router.post("/add-one", addOne)
router.post("/add-many", addMany)
router.get("/get-compare-by-userID", getCompareByUserID)
router.delete("/delete-one-item", removeOneByUserIdAndProductId)
router.delete("/delete-all-by-userID", removeAllByUserID)

module.exports = router;