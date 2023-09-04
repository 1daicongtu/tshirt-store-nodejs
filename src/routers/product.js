const express = require("express")
const router = express.Router()
const productController = require("../app/controllers/ProductController")

router.get("/all-product", productController.getAll);
router.get("/textsearch", productController.textSearch)

module.exports = router;
