const User = require("../models/user")
const {generateToken} = require("../helpers/jwt")
const {comparePassword} = require("../helpers/bcryptjs")
const {OAuth2Client} = require('google-auth-library')

class UserController {
    static register(req,res,next){
        const {email, password} = req.body
        User.create({email, password})
        .then(function(data){
            let payload = {email : data.email}
            let token = generateToken(payload)
            res.status(200).json("succesfully registered")
        })
        .catch(next)
    }
    static login(req,res,next){
        const {email, password} = req.body
        User.findOne({email})
        .then(function(data){
            if(data && comparePassword(password,data.password)){
                let payload = {email : data.email}
                let token = generateToken(payload)
                res.status(200).json(token)
            }else{
                throw {
                    msg: 'invalid email/password',
                    statusCode : 401
                }
            }
        })
        .catch(next)
    }
    static gsign(req,res,next){
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let emailUser = null
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.CLIENT_ID
        })
            .then(function(ticket){
                console.log(ticket, "masuk g sign")
                let {email}= ticket.getPayload()
                emailUser = email
                return User.findOne({email:emailUser})
            })
            .then(function(data){
                console.log("masuk signG")
                console.log(data)
                if (data){
                    const payload = {email : emailUser}
                    let token = generateToken(payload)
                    console.log (payload)
                    res.status(201).json(token)
                    return
                }
                else{
                    return User.create({email : emailUser, password:"google"})
                }
            })
            .then(function(data){
                console.log(emailUser)
                let payload = {email:emailUser}
                let token = generateToken(payload)
                res.status(201).json(token)
            })
            .catch(next)
    }

    static authentication(req, res, next){
        res.status(200).json("token oke")
    }
}

module.exports = UserController