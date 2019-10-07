const User = require('../Models/user');
const hashPassword = require('../Helpers/hashPassword');
const { generateToken } = require('../Helpers/jwt');
const { OAuth2Client } = require('google-auth-library')
const jwt = require('jsonwebtoken')

class UserController {

    static readAll(req, res) {
        User.find({})
            .then(function(users) {
                res.status(200).json(users)
            })
            .catch(function(err) {
                res.status(500).json({
                    message: err.message
                })
            })
    };

    static createUser(req, res) {

        User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })
            .then(function(user) {
                console.log('oke')
                res.status(201).json(user)
            })
            .catch(function(err) {
                res.status(500).json({
                    message: err.message
                })
            })
    };

    static userLogin(req, res) {

        const { username, password } = req.body

        User.findOne({ username: username })
            .then(function(user) {

                if (user) {

                    if (hashPassword.check(password, user.password)) {

                        let payload = {
                            id: user.id
                        }
                        let token = generateToken(payload)
                        req.headers.token = token;
                        res.status(200).json(token)
                    } else {
                        res.status(400).json({ message: "Invalid Username / Password" })
                    }
                } else {
                    res.status(404).json('username not found')
                }
            })
            .catch(function(err) {
                res.status(500).json(err)
            })
    };

    static googleLogin(req, res) {
        const client = new OAuth2Client(process.env.GOOGLECLIENTID)

        client.verifyIdToken({
                idToken: req.body.id_token,
                audience: process.env.GOOGLECLIENTID
            })
            .then(ticket => {
                const payload = ticket.getPayload();
                const generateToken = jwt.sign(payload, process.env.secret)
                res.status(200).json(generateToken)
            })
            .catch(console.log)
    }

} //


module.exports = UserController;