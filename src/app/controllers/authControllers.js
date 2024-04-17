const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { get } = require("mongoose")
require('dotenv').config()

const SECRETKEY_ACCESSTOKEN="123123"
const SECRETKEY_REFRESHTOKEN="123123"

const getAccestoken = (username, email) => {

    const secretKeyAccessToken = process.env.SECRETKEY_ACCESSTOKEN
    const accessToken = jwt.sign({username, email}, secretKeyAccessToken, {expiresIn: "1d"})
    return accessToken;
}

const getRefreshToken = (username, email) => {
    const secretKeyRefreshToken = process.env.SECRETKEY_REFRESHTOKEN
    const refreshToken = jwt.sign({username, email}, secretKeyRefreshToken, {expiresIn: "7d"})
    return refreshToken
}

class Authentication{
    async login(req, res, next){
        let userInDB = await User.findOne({username: req.body?.username}).lean();
        

        if (!userInDB) return res.status(401).json({message: "Username or password is not exist"})
        
        bcrypt.compare(req.body.password, userInDB.password, (err, result)=>{
            if (err) return res.status(500).json({message: "Something is wrong when compare password"})
            
            if (result) {
                const accessToken = getAccestoken(userInDB.username, userInDB.email)
                const refreshToken = getRefreshToken(userInDB.username, userInDB.email)
                const {password, ...userReturn} = userInDB
                
                return res.status(200).json({user: userReturn, accessToken, refreshToken})

            } else {
                return res.status(401).json({message: "Username or password is invalid"})
            }
        })

    }
    async getNewAccessToken(req, res, next){
        let refreshToken = req.body?.refreshToken
        if (!refreshToken) return res.status(401).json({message: "Refresh token is required"});

        jwt.verify(refreshToken, process.env.SECRETKEY_REFRESHTOKEN, (err, decoded)=>{
            if (err) return res.status(401).json({message: "Refresh token is invalid"})

            const username = decoded.username
            const email = decoded.email

            const newRefreshToken = getRefreshToken(username, email)
            const newAccessToken = getAccestoken(username, email)
            
            return res.status(200).json({accessToken: newAccessToken, refreshToken: newRefreshToken})
          
        })
    }
}

module.exports = new Authentication()