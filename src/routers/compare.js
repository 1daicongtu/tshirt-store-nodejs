const express = require('express');
const router = express.Router();

const CompareControllers = require("../app/controllers/CompareControllers")

router.post("/add-one", CompareControllers.addOne)
router.post("/add-many", CompareControllers.addMany)
router.get("/get-compare-by-userID", CompareControllers.getCompareByUserID)
router.delete("/delete-one-item", CompareControllers.removeOneByUserIdAndProductId)
router.delete("/delete-all-by-userID", CompareControllers.removeAllByUserID)

module.exports = router;