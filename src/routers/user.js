const express = require("express")
const router = express.Router()

const {
    addUser
} = require("../app/controllers/UserControlers.js")

router.post("/sign-up", addUser)



module.exports = router;