const {OAuth2Client} = require('google-auth-library');
const User = require('../models/user')

const client = new OAuth2Client('1064661640914-1aefku5io65dqkgj9tm0u0dmjumidkvk.apps.googleusercontent.com');

class UserController{
    static createOne(req, res, next){
        const {name, email, password} = req.body
        User.create({
            name,
            email,
            password
        })
            .then(user=>{
                res.send(user)
            })
            .catch(next)
    }

    static login(req, res, next){
        const {email, password} = req.body
        User.findOne({email})
            .then(user=>{
                if(user && user.password == password){
                    res.send('password benar')
                }
                else{
                    throw {msg: 'Password atau email salah'}
                }
            })
            .catch(next)
    }

    static oauth(req, res, next){
        const idToken = req.body.id_token
        let email, name
        client.verifyIdToken({
            idToken,
            audience: '1064661640914-1aefku5io65dqkgj9tm0u0dmjumidkvk.apps.googleusercontent.com'
        })
            .then(ticket=>{
                const payload = ticket.getPayload()
                name = payload.name
                email = payload.email
                return User.findOne({email})
            })
            .then(user=>{
                if(!user){
                    return User.create({
                    name,
                    email,
                    password: 'dummy123'
                    })
                }
            })
            .then(user=>{
                res.send(idToken)
            })
            .catch(next)
    }
}

module.exports = UserController