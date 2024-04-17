const express = require("express")
const router = express.Router()

const {
    getCommentByProductID,
    getRateCommentByProductID, 
    postComment
} = require("../app/controllers/CommentControllers.js")

router.post("/post-comment", postComment)
router.get("/get-rate-comment", getRateCommentByProductID)
router.get("/get-comment", getCommentByProductID)

module.exports = router;