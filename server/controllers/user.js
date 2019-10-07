const { encodeToken } = require('../helpers/jwt')
const User = require('../models/user')
const { comparePassword } = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library')

class UserController {
    static login (req, res, next) {
        const { email, password } = req.body
        User.findOne({ email }).exec()
        .then(user => {
            const { username, _id } = user
            if (user && comparePassword(password, user.password)) {
                const payload = { _id, username, email, password }
                const token = encodeToken(payload)
                payload.token = token
                res.status(200).json({ user: payload })
            }
            else next({ status: 401, msg: 'Incorrect E-mail / Password' })
        })
        .catch(err => next({ msg: err.message }))
    }
    static logout (req, res, next) {
        req.loggedUser = null
        res.status(200).json({ msg: 'Successfully Logged Out!' })
    }
    static register (req, res, next) {
        const { username, email, password } = req.body
        const payload = { username, email, password }
        const token = encodeToken(payload)
        payload.token = token
        User.create({ username, email, password })
        .then(user => {
            payload._id = user._id
            res.status(201).json({ user: payload })})
        .catch(err => {
            console.log(err)
            next({ msg: err.message })})
    }
    static googleSignIn(req, res, next) {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        const { id_token } = req.body
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket => {
            const payload = ticket.getPayload()
            const { email, name } = payload
            User.findOne({ email }).exec()
            .then(user => {
                if (user) {
                    const { _id, username, email, password } = user
                    const payloadJwt = { _id, username, email, password }
                    const token = encodeToken(payloadJwt)
                    payloadJwt.token = token
                    res.status(200).json({ user: payloadJwt })
                } else {
                    const data = { msg: 'User Not Found', user: { email, name }}
                    res.json(data)
                }
            })
            .catch(err => next({ msg: err.message }))
        })
        .catch(err => next({ msg: err.message }))
    }
}


module.exports = UserController