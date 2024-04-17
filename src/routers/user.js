const express = require("express")
const router = express.Router()

const userControler = require("../app/controllers/UserControlers.js")

router.post("/sign-up", userControler.addUser)



module.exports = router;