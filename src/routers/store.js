const express = require("express")
const router = express.Router()

const storeController = require("../app/controllers/StoreController.js")

router.get("/all-store", storeController.getAll)


module.exports = router;