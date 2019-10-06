const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {OAuth2Client} = require('google-auth-library');

class UserController {
    static register(req, res) {
        const createdData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        User.create(createdData)
            .then(created_data => {
                res.status(201).json(created_data)
            })
            .catch(err => {
                res.status(500).json(`${err} (User registration is failed)`)
            }) 
    }

    static login(req, res) {
        const name = {
            name: req.body.name
        }

        User.findOne(name)
        .then(loggedIn_userData => {
            const passwordIsTrue = bcrypt.compareSync(req.body.password, loggedIn_userData.password)
            if(passwordIsTrue) {
                const data = {
                    id: loggedIn_userData._id,
                    name: loggedIn_userData.name,
                    email: loggedIn_userData.email,
                    password: loggedIn_userData.password
                }
                const token = jwt.sign(data, process.env.SECRET)
                res.status(200).json({token, data})
            } else {
                
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })

    }

    static googleLogin(req, res) {
        const client = new OAuth2Client(process.env.GOOGLECLIENTID);
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.GOOGLECLIENTID
        })
        .then(ticket => {
            // const payLoad = ticket.getPayLoad() //bingung, payLoad tidak bisa, payload bisa, need to explore more
            const payload = ticket.getPayload();
            const generateToken = jwt.sign(payload, process.env.SECRET)
            res.status(200).json(generateToken)
        })
        .catch(err => {
            res.status(500).json(`${err} (Google Sign-In Verification is failed)`)
        })

    }

}

module.exports = UserController