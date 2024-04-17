const Comment = require("../models/comment.js")
const cloudinary = require("../../utils/cloudinary.js")
var formidable = require("formidable")

const cloudinaryUploadOneImage = async (images) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(images, {
            folder: "comment"
        }, (error, result) => {
            if(error) {
                console.log(error)
                return reject(error)
            }

            resolve({
                url: result.secure_url,
                public_id: result.public_id
            })
        })
    })
}


async function postComment(req, res, next){
        
    try {
        let otherData = null;
        let imagesData = [];
        let form = new formidable.IncomingForm(); 
        form.parse(req, async(err, fields, files) => {
            if (err) return res.status(401).json({message: "upload image failed"})
           
            if (files?.images) {
                for (const file of files.images){
                    imagesData.push(await cloudinaryUploadOneImage(file.filepath))
                }
            }

            otherData = JSON.parse(fields?.data[0])
            
            await Comment.create({
                ...otherData,
                images: imagesData.length > 0 ? imagesData : null
            })
            return res.status(200).json({message: "Create comment successfully"});
        })

    } catch (error) {
        return res.status(500).json({message: "Error when create comment"})
    }
   
}
async function getRateCommentByProductID(req, res, next){
    let proID = req.query.productID;

    proID = proID - 0;

    
    try {
    
        const result = await Comment.aggregate(
            [
            {
                $match: {
                    productID: proID
                }
            },
            {
                $group: {
                    _id: "$rating",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    star: "$_id",
                    count: 1
                }
            }
            ]
        )
      
        return res.status(200).json({result})
   } catch (error) {
        return res.status(500).json({message: "Error when get comment"})
   }

}
async function getCommentByProductID(req, res, next){
    let limit = req.query.limit - 0;
    let page = req.query.page - 0;
    let proID = req.query.productID - 0;
    try {
        const result = await Comment.find({productID: proID}).skip((page - 1) * limit).limit(limit).lean();

        return res.status(200).json({isMax: result.length != limit , result})

    } catch (error) {
        return res.status(500).json({message: "Error when get comment"})
    }
    
}

module.exports = {
    postComment,
    getRateCommentByProductID,
    getCommentByProductID
}