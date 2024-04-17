const Wishlist = require("../models/wishlist.js")
const Product = require("../models/product.js")


var ObjectId = require('mongoose').Types.ObjectId; 


async function addMany(req, res, next){
    const {userID, wishlist} = req.body

    if (!wishlist ||  !Array.isArray(wishlist) || wishlist.length === 0){
        return res.status(401).json({
            success: false,
            message: "cartList must be array and not empty"
        })
    }

    const isNumberAll = wishlist.every((item)=> typeof item === "string")

    if (!isNumberAll){
        return res.status(401).json({
            success: false,
            message: "cartList must be array of number"
        })
    }

    try {
        const isExistWishlist = await Wishlist.findOne({userID: new ObjectId(userID)}).lean()
        if (isExistWishlist){
            const wishListStringId = isExistWishlist.wishlists?.map((item)=> item.toString());
            wishlist.forEach(async (item)=>{
                
                if (!wishListStringId.includes(item)){
                    await Wishlist.updateOne({userID: new ObjectId(userID)}, {$push: {wishlists: item}})
                }
            })
            return res.status(200).json({
                success: true,
                message: "Add wishlist successfully"
            })
        } else {    
            await Wishlist.create({userID: userID, wishlists: wishlist})
        }

    } catch (error) {
        
        return res.status(401).json({
            success: false,
            message: "Error when add wishlist"
        })
    }
}
async function addOne(req, res, next){
    const {userID, productObjectId} = req.body
    
    try {
        if (!productObjectId || !userID){
            return res.status(401).json({
                success: false,
                message: "userID and productID is required"
            })
        }
        
        const isExistWishlist = await Wishlist.findOne({userID: userID}).lean()
        if (isExistWishlist){
            const wishListStringId = isExistWishlist.wishlists?.map((item)=> item.toString());
           
            if (!wishListStringId.includes(productObjectId)){
                const result = await Wishlist.updateOne({userID: userID}, {$push: {wishlists: productObjectId}})
               
                return res.status(200).json({
                    success: true,
                    message: "Add wishlist successfully"
                })

            } else {
                return res.status(401).json({
                    success: false,
                    message: "Product already exist in wishlist"
                })
            }
           
        } else {
            await Wishlist.create({userID: userID, wishlists: [productObjectId]})
            return res.status(200).json({
                success: true,
                message: "Add wishlist successfully"
            })
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Error when add wishlist"
        })
    }
}
async function deleteOne(req, res, next){

    const {userID, productObjectId} = req.query;
    if (!productObjectId || !userID || typeof productObjectId !== "string"){
        return res.status(401).json({
            success: false,
            message: "userID and productID is required"
        })
    }

    try {
        const result = await Wishlist.updateOne({userID: userID}, {$pull: {wishlists: productObjectId}})
        
        if (result.updateCount === 0){
            return res.status(401).json({
                success: false,
                message: "Error when delete wishlist"
            })
        } else {
            const isExistWishlist = await Wishlist.findOne({userID: new ObjectId(userID)}).lean()
            if (isExistWishlist.wishlists.length === 0){
                await Wishlist.deleteOne({userID: userID})
            }

            return res.status(200).json({
                success: true,
                message: "Delete wishlist successfully"
            })
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Error when delete wishlist"
        })
    }

}
async function getAll(req, res, next){
    const {userID} = req.query
    if (!userID){
        return res.status(401).json({
            success: false,
            message: "userID is required"
        })
    }
    try {
        // db.wishlists.aggregate([{$match: {_id: ObjectId("64f17fd2521528c1b1bc02fd")} }, {$lookup: {from: "products", localField: "wishlists", foreignField: "_id", as: "products"} }, {$project: {_id: 1, userID: 1, products: 1} } ])
        const result = await Wishlist.aggregate([
            {$match: {userID: new ObjectId(userID)} },
            {$lookup: {from: "products", localField: "wishlists", foreignField: "_id", as: "products"} },
            {$project: {_id: 1, userID: 1, products: 1} }
        ]);

        return res.status(200).json({
            success: true,
            wishlists: result
        });
        
    } catch (error) {
       
        return res.status(401).json({
            success: false,
            message: "Error when get wishlist"
        })
    }
}

module.exports = {
    addOne,
    addMany,
    deleteOne,
    getAll
}
