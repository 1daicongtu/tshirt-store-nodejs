const express = require("express")
const router = express.Router()

const {
    getAll
} = require("../app/controllers/StoreController.js")

router.get("/all-store", getAll)


module.exports = router;