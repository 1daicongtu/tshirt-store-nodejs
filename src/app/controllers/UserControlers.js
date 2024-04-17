const User = require("../models/user.js")

class UserControler{
    async addUser(req, res, next){
      
        const userInDB = await User.findOne({username: req.body?.username}).lean();
        if (req.body?.username  === userInDB?.username) return res.status(400).json({message: "Username is already exist"})
        
        const {confirmPassword, ...newUser} = req.body;
        newUser.role = "user";
        try {
            await User.create(newUser)
            return res.status(200).json({message: "Create user successfully"});
        } catch (error) {
            return res.status(500).json({message: "Error when create user"})
        }
        
    }

    
}

module.exports = new UserControler();