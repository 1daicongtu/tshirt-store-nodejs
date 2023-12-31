const Contact = require("../models/contact")

const ContactController = {
    async addContact(req, res, next){
        const {username, email, massage} = req.body
        if (!username || !email){
            return res.status(401).json({success: false, message: "Missing required fields (username or email)"})
        }
        try {
            await Contact.create({username, email, massage})
            return res.status(200).json({success: true, message: "Create contact successfully"})
        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, message: "Error when create contact"})
        }
    }
}

module.exports = ContactController;