const User = require('../models/User');
const { createToken, verifyUser } = require('../helpers/jwt')
const { compare } = require('../helpers/bcryptjs')
const md5 = require('md5')

class UserController {
    static create(req, res, next) {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
            .then((User) => {
                const token = createToken({ id: User._id })
                res.status(201).json({
                    username: User.username,
                    email: User.email,
                    gravatar: md5(User.email),
                    id: User._id,
                    token
                })
            })
            .catch(next);
    }

    static login(req, res, next) {
        const { identity, password } = req.body;
        User.findOne({ $or: [{ username: identity }, { email: identity }] })
            .then((User) => {
                if (User && compare(password, User.password)) {
                    const token = createToken({ id: User._id })
                    res.status(200).json({
                        username: User.username,
                        email: User.email,
                        gravatar: md5(User.email),
                        id: User._id,
                        token
                    })
                } else {
                    let err = new Error('Wrong Username / Email / Password')
                    err.name = 'AuthenticationError'
                    next(err)
                }
            })
            .catch(next);
    }

    static verify(req, res, next) {
        try {
            verifyUser(req.headers.token)
            res.status(200).json({ message: "User Verified" })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController
