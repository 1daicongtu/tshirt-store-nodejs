const Product = require("../models/product.js")


class ProductController{
    getAll(req, res, next){
        Product.find({})
            .then((product)=> res.status(200).json(product))
            .catch((error) => res.status(500).json([]))
    }
    async textSearch(req, res, next){
        if (!req.query.textsearch){
            return res.status(200).json([]);
        }
      
        const result = await Product.find({$text: {$search: req.query.textsearch}}).lean();
        
        return res.status(200).json(result);
    }
}

module.exports = new ProductController();