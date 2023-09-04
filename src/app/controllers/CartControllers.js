const Cart = require("../models/cart")


class CartControllers {
    async addOne(req, res, next){
        const {userID, productID, productName, colorSelected, sizeSelected, quantity, productDetailSelected} = req.body
        try {
            const cartInDb = await Cart.findOne(
                {
                    userID: userID, 
                    productID: productID, 
                    colorSelected: colorSelected, 
                    sizeSelected: sizeSelected,
                    "productDetailSelected.typeName": productDetailSelected?.typeName
                }
            ).lean()
            // already exist
            if (cartInDb){
                await Cart.updateOne({_id: cartInDb._id}, {quantity: cartInDb.quantity + quantity})
                return res.status(200).json({
                    success: true,
                    message: "Add cart successfully"
                })
            } else {
                await Cart.create(
                    {
                        userID,
                        productID,
                        productName,
                        colorSelected,
                        sizeSelected,
                        quantity,
                        productDetailSelected
                    }
                )
                return res.status(200).json({
                    success: true,
                    message: "Add cart successfully"
                })
            }
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Error when add cart"
            })
        }
    }
    async addMany(req, res, next){
        const {userID, cartList} = req.body
        try {
            cartList.forEach(async (cart)=>{
                const cartInDb = await Cart.findOne(
                    {
                        userID: userID, 
                        productID: cart.productID, 
                        colorSeleted: cart.colorSeleted, 
                        sizeSeleted: cart.sizeSeleted,
                        "productDetailSelected.typeName": cart.productDetailSelected?.typeName
                    }
                ).lean()
                // already exist
                if (cartInDb){
                    await Cart.updateOne({_id: cartInDb._id}, {quantity: cart.quantity})
                   
                } else {
                    await Cart.create(
                        {
                            userID,
                            ...cart
                        }
                    )
                }
            })
            
            return res.status(200).json({
                success: true,
                message: "Add cart successfully"
            })

        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Error when add cart"
            })
        }
    }
    async deleteOne(req, res, next){
            const {userID, productID, colorSeleted, sizeSeleted, typeName} = req.query
        
            try {
                const result = await Cart.deleteOne({
                    userID: userID,
                    productID: productID,
                    colorSeleted: colorSeleted,
                    sizeSeleted: sizeSeleted,
                    "productDetailSelected.typeName": typeName
                })
                console.log(result)
                if (result.deletedCount == 1) {
                    return res.status(200).json({
                        success: true,
                        message: "Delete one item in cart successfully"
                    })
                } else {
                    return res.status(401).json({
                        success: false,
                        message: "Error when delete one item in cart"
                    })
                }
            } catch (error) {
                return res.status(401).json(
                    {
                        success: false,
                        message: "Error when delete one item in cart"
                    }
                )
            }
    }
    async updateQuantityOfItemCart(req, res, next){
        const {userID, productID, colorSelected, sizeSelected, typeName, quantity} = req.body

        try {
            const result = await Cart.updateOne(
                {
                    userID: userID,
                    productID: productID,
                    colorSelected: colorSelected,
                    sizeSelected: sizeSelected,
                    "productDetailSelected.typeName": typeName

                },
                {
                    quantity: quantity
                }
            )
          
            if (result.modifiedCount == 1) {
                return res.status(200).json({message: "Update quantity of item cart successfully"})
            } else {
                return res.status(401).json({message: "Error when update quantity of item cart"})
            }
        } catch (error) {
            return res.status(401).json({message: "Error when update quantity of item cart"})
        }
    }
    async getCartListByUserID(req, res, next){
        const userID = req.query.userID
        try {
            const cartList = await Cart.find({userID: userID}).lean()
            return res.status(200).json({cartList: cartList})

        } catch (error) {
            return res.status(401).json({message: "Error when get cart list"})
        }
    }
}

module.exports = new CartControllers();