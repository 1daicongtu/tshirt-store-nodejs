const express = require("express")
const router = express.Router()
const {
    getAll,
    textSearch
} = require("../app/controllers/ProductController.js")

router.get("/all-product", getAll);
router.get("/textsearch", textSearch)

module.exports = router;
