const express = require("express")
const router = express.Router()

const {
    login,
    getNewAccessToken
} = require("../app/controllers/AuthControllers.js")

router.post("/login", login)
router.post("/refresh-token", getNewAccessToken)

module.exports = router;