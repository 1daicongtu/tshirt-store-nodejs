const Compare = require("../models/compare.js")

const checkIsContain = (productID, listCompare) => {
    const index = listCompare.findIndex(item => item.toString() === productID);
    return index !== -1;
}

const ObjectId = require('mongoose').Types.ObjectId;

class CompareControllers {
    async addOne(req, res, next) {
        const {userID, productObjectId} = req.body

        if (!userID || !productObjectId){
            return res.status(401).json({success: false, message: "Missing required fields (userID or productID) "})
        }
        try {
            
            const compare = await Compare.findOne({userID})
            if (compare) {
                const isContain = checkIsContain(productObjectId, compare.listCompare)
                if (!isContain) {

                    if (compare.listCompare.length >= 4) {
                        compare.listCompare.shift();
                    }

                    compare.listCompare.push(productObjectId)
                    
                    await compare.save()
                    return res.status(200).json({success: true, data: "Add item compare successfully"})
                }
                return res.status(401).json({success: false, message: "Product already exists"})
            }
            const newCompare = await Compare.create({userID, listCompare: [productObjectId]})
            return res.status(200).json({success: true, data: "Add item compare successfully"})
        } catch (error) {
            return res.status(401).json({success: false, message: "Add item compare failed"});
        }
    }
    async addMany (req, res, next) {
        const {userID, productIDList} = req.body;
        if (!userID || !productIDList) {
            return res.status(401).json({success: false, message: "Missing required fields (userID or productIDList)"})
        }
        try {
            const compare = await Compare.findOne({userID});
       
            if (compare){
                productIDList.forEach(async productID => {
                    const isContain = checkIsContain(productID, compare.listCompare);

                    if (!isContain) {
                        if (compare.listCompare.length >= 4) {
                            compare.listCompare.shift();
                        }
                        compare.listCompare.push(productID);

                        await compare.save();
                      
                    }
                })
                return res.status(200).json({success: true, data: "Add item compare successfully"});
            } else {
               
                const newCompare = await Compare.create({userID, listCompare: [...productIDList]});
               
                return res.status(200).json({success: true, data: "Add item compare successfully"});
            }
        } catch (error) {
           
            return res.status(401).json({success: false, message: "Add item compare failed"});
        }
    }
    async removeOneByUserIdAndProductId(req, res, next) {
        const {userID, productObjectId} = req.query;
        if (!userID || !productObjectId) {   
            return res.status(401).json({success: false, message: "Missing required fields (userID or productID)"});
        } 
        try {
            const compare = await Compare.findOne({userID});
            if (compare) {
                const isContain = checkIsContain(productObjectId, compare.listCompare);
                if (isContain) {
                    const index = compare.listCompare.findIndex(item => item.toString() === productObjectId);
                    compare.listCompare.splice(index, 1);

                    if (compare.listCompare.length === 0) {
                        await Compare.deleteOne({userID});
                        return res.status(200).json({success: true, data: "Remove item compare successfully"});
                    }

                    await compare.save();
                    return res.status(200).json({success: true, data: "Remove item compare successfully"});
                }
                return res.status(401).json({success: false, message: "Product does not exist"});
            }
            return res.status(401).json({success: false, message: "Compare does not exist"});
        } catch (error) {
            return res.status(401).json({success: false, message: "Remove item compare failed"});
        }
    }
    async getCompareByUserID(req, res, next) {
        const {userID} = req.query;
        if (!userID) return res.status(401).json({success: false, message: "Missing required fields (userID)"});

        try {
            const result = await Compare.aggregate([
                {
                    $match: {userID: new ObjectId(userID)}
                }, 
                {
                    $lookup: {
                        from: "products",
                        localField: "listCompare",
                        foreignField: "_id",
                        as: "products"
                    }
                },
                {
                    $project: {
                        _id: 0,
                        products: 1,
                        userID: 1,
                    }
                }
            ])
            return res.status(200).json({success: true, compares: result});
        } catch (error) {
            return res.status(401).json({success: false, message: "Get compare failed"});
        }
    }
    async removeAllByUserID(req, res, next) {  
        const {userID} = req.query;

        if (!userID) return res.status(401).json({success: false, message: "Missing required fields (userID)"});

        try {
            
            const result = await Compare.deleteOne({userID})

            if (result.deletedCount === 0) return res.status(401).json({success: false, message: "Compare does not exist"});

            return res.status(200).json({success: true, data: "Remove all item compare successfully"});

        } catch (error) {
            return res.status(401).json({success: false, message: "Remove all item compare failed"});
        }
    }
}

module.exports = new CompareControllers()