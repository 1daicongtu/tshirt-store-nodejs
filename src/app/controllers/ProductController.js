const Product = require("../models/product")


class ProductController{
    getAll(req, res, next){
        Product.find({})
            .then((product)=> res.status(200).json(product))
            .catch((error) => res.status(500).json([]))
    }
}

module.exports = new ProductController();