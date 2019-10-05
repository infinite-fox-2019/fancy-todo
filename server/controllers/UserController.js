const User = require('../models/User')
const {hashPassword} = require('../helpers/bcryptjs')
const {generateToken} = require('../helpers/jwt')
const {comparePassword} = require('../helpers/bcryptjs')

class UserController {
    static register(req, res, next) {
        console.log('masuk')
        const {email, password} = req.body
        if(!email || !password) {
            throw {status: 400, msg: 'Please fill all the form'}
        }

        User.create({email, password: hashPassword(password)})
        .then(_ => {
            res.status(200).json({message: 'user registered successfully'})
        })
        .catch(next)
    }

    static login(req, res, next) {
        const {email, password} = req.body
        if(!email || !password) {
            throw {status: 400, msg: 'Please fill all the form'}
        }

        User.findOne({email})
        .then(user => {
            if(user && comparePassword(password, user.password)) {
                res.status(200).json({token: generateToken({email})})
            } else {
                throw {status: 401, msg: 'Wrong email/password'}
            }
        })
        .catch(next)
    }
}

module.exports = UserController