const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const User = require('../models/user')
const { generateToken } = require('../helpers/jwt')

class GoogleController{

    static gsignin(req,res){
        client.verifyIdToken({
            idToken: req.body.idtoken,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(({payload})=>{
            const { email, name } = payload
            User.findOne({email}).then((user)=>{
                if (user){
                    return user
                } else {
                    return User.create({
                        username : name,
                        email,
                        password : '12345'
                    })
                }
            })
            .then((user)=>{
                const payload = {
                    name : user.name,
                    email : user.email
                }
                const token = generateToken(payload)
                res.status(201).json(
                    token
                ) 
            })
        })
        .catch((err)=>{
            res.status(400).json({
                message: "failed to get starred repos",
                error : err
            }) 
        })
    }
}

module.exports = GoogleController