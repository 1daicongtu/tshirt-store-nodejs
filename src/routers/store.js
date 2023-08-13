const express = require("express")
const router = express.Router()

const storeController = require("../app/controllers/StoreController")

router.get("/all-store", storeController.getAll)


module.exports = router;