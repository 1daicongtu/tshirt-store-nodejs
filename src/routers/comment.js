const express = require("express")
const router = express.Router()

const commentController = require("../app/controllers/CommentControllers")

router.post("/post-comment", commentController.postComment)
router.get("/get-rate-comment", commentController.getRateCommentByProductID)
router.get("/get-comment", commentController.getCommentByProductID)

module.exports = router;