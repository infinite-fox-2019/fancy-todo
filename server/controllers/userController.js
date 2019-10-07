const User = require('../models/user')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const { generateToken } = require('../helpers/jwt')
const { comparePass } = require('../helpers/bcrypt')
const ObjectId = require('mongoose').Types.ObjectId


class UserController {

    static gLogin(req, res, next) {
        // console.log('masuk glogin');
        const { id_token } = req.body;
        let userData
            // console.log({ id_token });
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })

        .then(ticket => {
            let gPayload = ticket.getPayload()
                // console.log({ gPayload });
            userData = { name: gPayload.name, email: gPayload.email }

            return User.findOne({ email: gPayload.email })
        })

        .then(user => {
            if (user) {
                const token = generateToken({ id: ObjectId(user._id) })
                res.status(200).json(token)
                next()
            } else {
                userData.password = 'password'
                return User.create(userData)
            }
        })

        .then(user => {

            const token = generateToken({ id: ObjectId(user._id) })

            res.status(200).json(token)
        })

        .catch(next)
    }


    static regularLogin(req, res, next) {
        const { email, password } = req.body
        User.findOne({ email })
            .then(user => {
                if (user && comparePass(password, user.password)) {
                    const token = generateToken({ id: user._id })
                    console.log(token);
                    res.status(200).json(token)

                } else {
                    next({ status: 400, message: 'invalid username/password' })
                }

            })
            .catch(next)
    }

    static register(req, res, next) {
        const { name, email, password } = req.body

        const input = { name, email, password }

        User.create(input)
            .then(user => {
                const token = generateToken({ id: user._id })
                res.status(200).json(token)
            })
            .catch(next)
    }

    static updatePassword(req, res, next) {
        const { email, newPassword } = req.body

        User.findOne({ email })
            .then(user => {
                user.password = newPassword
                user.save()
                res.status(200).json({ message: 'Updated password successfully.' })
            })
            .catch(next)
    }
}




module.exports = UserController