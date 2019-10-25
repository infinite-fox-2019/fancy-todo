const User = require('../model/user')
const { OAuth2Client } = require('google-auth-library')
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
const { generateToken } = require('../helpers/jwt')
const { compare } = require('../helpers/bcrypt')


class UserController {

    static register(req, res, next) {
        let { username, email, password } = req.body
        User.create({ username, email, password })
            .then((user) => {
                const payloadJwt = { id: user._id }
                let token = generateToken(payloadJwt)
                res.status(201).json({ token, user })
            })
            .catch(next)
    }

    static login(req, res, next) {
        let { email, password } = req.body
        User.findOne({ email })
            .then((user) => {
                if(user){
                    if(compare(password, user.password)){
                        const payloadJwt = { id: user._id }
                        let token = generateToken(payloadJwt)
                        res.status(201).json({ token, user })
                    } else{
                        next({
                            status: 400,
                            msg: ['username or password is wrong']
                        })
                    }
                }else{
                    next({
                        status: 400,
                        msg: ['username or password is wrong']
                    })
                }
            })
            .catch(next)
    }

    static googleLogin(req, res, next) {

        let payload = null
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
            .then(ticket => {
                payload = ticket.getPayload()
                return User.findOne({ email: payload.email })
            })
            .then((user) => {
                if (user) {
                    return user
                } else {
                    return User.create({
                        username: payload.name,
                        email: payload.email,
                        password: process.env.DEFAULT_PASS
                    })
                }
            })
            .then((user) => {
                const payloadJwf = { id: user._id }
                let token = generateToken(payloadJwf)
                res.status(200).json({ token, user })
            })
            .catch(next);
    }
}

module.exports = UserController
