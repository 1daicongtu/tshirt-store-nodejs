const express = require("express")
const router = express.Router()

const {
    addContact
} = require("../app/controllers/ContactControllers.js");

router.post("/", addContact)

module.exports = router;