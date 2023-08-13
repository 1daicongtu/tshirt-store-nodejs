const express = require("express")
const router = express.Router()

const authController = require("../app/controllers/authControllers")

router.post("/login", authController.login)
router.post("/refresh-token", authController.getNewAccessToken)

module.exports = router;