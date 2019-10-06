const User = require('../models/User')
const {generateToken} = require('../helpers/jwt')
const {hashPassword} = require('../helpers/bcryptjs')
const {comparePassword} = require('../helpers/bcryptjs')
const {OAuth2Client} = require('google-auth-library');

class UserController {
    static signUp(req, res, next) {
        const {email, password} = req.body

        User.findOne({email})
        .then(user => {
            if(user) {
                if(user.password !== process.env.DUMMY_PASSWORD) {
                    throw {status: 409, title: 'Invalid Input', msg: 'Email already registered'}
                }
                if(!password) {
                    throw {status: 400, title: 'Invalid Input', msg: 'password cannot be empty'}
                }
                user.password = password
                user.save()
            } else {
                return User.create({email, password: password})
            }
        })
        .then(_ => {
            res.status(201).json({message: 'Email registered successfully'})
        })
        .catch(next)
    }

    static signIn(req, res, next) {
        const {email, password} = req.body
        if(!email || !password) {
            throw {status: 400, title: 'Invalid Input', msg: 'Please fill all the form'}
        }

        User.findOne({email})
        .then(user => {
            let valid = false
            if(user && user.password) {
                if(comparePassword(password, user.password)){
                    valid = true
                }
            }
            if(valid) {
                res.status(200).json({token: generateToken({email})})
            } else {
                throw {status: 401, title: 'Invalid Input', msg: 'Wrong email/password'}
            }
        })
        .catch(next)
    }

    static googleSignIn(req, res, next) {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        let payloadJWT
        let token
        let statusCode = 200
        client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket => {
            const payload = ticket.getPayload()
            const {email} = payload
            payloadJWT = {email}
            return User.findOne({email})
        })
        .then(user => {
            token = generateToken(payloadJWT)
            if(user) {
                return ''
            } else {
                statusCode = 201
                return User.create({email: payloadJWT.email, password: process.env.DUMMY_PASSWORD})
            }
        })
        .then(_ => {
            res.status(statusCode).send({token})
        })
        .catch(next)
    }

    static update(req, res, next) {
        let {timepoint} = req.body
        User.findById(req.loggedUser.id)
        .then(user => {
            timepoint = Number(timepoint) + user.timepoint
            return User.findByIdAndUpdate(
                req.loggedUser.id, {$set: {timepoint}}
            )
        })
        .then(_ => {
            res.status(200).json({message: 'timepoint updated'})
        })
        .catch(next)
    }

    static findOne(req, res, next) {
        User.findById(req.loggedUser.id)
        .then(({email, timepoint}) => {
            res.status(200).json({email, timepoint})
        })
        .catch(next)
    }
}

module.exports = UserController