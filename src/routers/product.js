const express = require("express")
const router = express.Router()
const productController = require("../app/controllers/ProductController")

router.get("/all-product", productController.getAll);


module.exports = router;
