const User = require('../models/user')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const { generateToken } = require('../helpers/jwt')
const { comparePass } = require('../helpers/bcrypt')

class UserController {

    static gLogin(req, res, next) {

        const { id_token } = req.body;

        let userData

        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })

        .then(ticket => {
            let gPayload = ticket.getPayload()

            userData = { name: gPayload.name, email: gPayload.email }

            return User.findOne({ email })
        })

        .then(user => {
            if (user) {

                const { _id } = user

                const token = generateToken({ id: _id })

                res.status(200).json(token)

            } else {
                userData.password = 'password'
                return User.create(userData)
            }
        })

        .then(user => {
            const { _id } = user

            const token = generateToken({ id: _id })

            res.status(200).json(token)
        })

        .catch(next)
    }


    static regularLogin(req, res, next) {
        const { email, password } = req.body

        User.findOne({ email })
            .then(user => {
                if (comparePass(password, user.password)) {
                    const token = generateToken({ id: user._id })
                    res.status(200).json(token)

                } else {
                    next({ status: 400, message: 'invalid username/password' })
                }

            })
            .catch(next)
    }

    static register(req, res, next) {
        const { email, password } = req.body

        const input = { email, password }

        User.create(input)
            .then(user => {
                const token = generateToken({ id: user._id })
                res.status(200).json(token)
            })
            .else(next)
    }

}


module.exports = UserController