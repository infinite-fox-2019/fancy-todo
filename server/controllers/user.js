const User = require('../models/user')
const { tokenGenerate } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcryptjs')

class userController {
    static find(req, res, next) {
        User.find().populate('eventId')
            .then(users => {
                res.status(200).json(users)
            })
            .catch(next)
    }

    static findById(req, res, next) {
        User.findById(req.params.id).populate('eventId')
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
                res.status(201).json(user)
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
                    res.status(200).json({ token })
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

    }
}

module.exports = userController