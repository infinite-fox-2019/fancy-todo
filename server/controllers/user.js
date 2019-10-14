const User = require('../models/user')
const { tokenGenerate } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcryptjs')
const { OAuth2Client } = require('google-auth-library')

class userController {
    static find(req, res, next) {
        User.find().populate('eventId')
            .then(users => {
                res.status(200).json(users)
            })
            .catch(next)
    }

    static findById(req, res, next) {
        User.findById(req.params.id).populate({
            path: 'eventId',
            model: `Event`,
            populate: {
                path: 'member',
                select: 'name',
                model: 'User'
            }
        })
            .then(user => {
                res.status(200).json(user)
            })
            .catch(next)
    }

    static search(req, res, next) {

    }

    static register(req, res, next) {
        const { name, email, password } = req.body
        User.create({ name, email, password })
            .then(user => {
                let payload = {
                    id: user._id
                }

                let token = tokenGenerate(payload)
                res.status(201).json({ id: user._id, token })
            })
            .catch(next)
    }

    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({ email })
            .then(user => {
                if (user && comparePassword(password, user.password)) {
                    let payload = {
                        id: user._id
                    }

                    let token = tokenGenerate(payload)
                    res.status(200).json({ id: user._id, token })
                } else {
                    next({
                        status: 400,
                        message: `invalid email/password`
                    })
                }
            })
            .catch(next)
    }

    static loginGoggle(req, res, next) {
        const client = new OAuth2Client(process.env.CLIENT_ID_GOOGLE);
        let payload = null;
        client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.CLIENT_ID_GOOGLE
        })
            .then(ticket => {
                payload = ticket.getPayload()
                return User.findOne({
                    email: payload.email
                })
            })
            .then(user => {
                if (user) {
                    return user
                } else {
                    return User.create({
                        name: payload.name,
                        password: process.env.PASSWORD_USER,
                        email: payload.email
                    })
                }
            })
            .then(user => {
                const token = tokenGenerate({
                    id: user._id
                })
                res.status(201).json({
                    token,
                    id: user._id
                })
            })
            .catch(next)
    }
}

module.exports = userController