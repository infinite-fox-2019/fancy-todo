const { OAuth2Client } = require("google-auth-library")
const axios = require("axios");
const User = require("../models/User")
const jwt = require("../helpers/jwt")
const client = new OAuth2Client("724959796781-ap28tr3iu8j74f1qindip87acg52bk46.apps.googleusercontent.com")
const { compare, hashPassword } = require("../helpers/bcrypt")

class UserController {
    static Register (req, res) {
        let { email, password} = req.body
        User.create(
            {
                email,
                password
            }
        )
        .then ( result => {
            res.status(201).json(result)
        })
        .catch ( err => {
            res.status(404).json(
                {
                    msg: "username telah terdaftar"
                }
            )
        })
    }

    static loginBiasa (req, res) {
        let { email, password } = req.body
        User.findOne(
            {
                email
            }
        )
        .then ( result => {
            console.log(result, password, result.password)
            if (compare( password, result.password)) {
                console.log("masuk")
                let token = jwt.generateToken(
                    {
                        _id: result._id,
                        email: result.email
                    }
                )
                res.status(200).json(token)
            } else {
                console.log("error")
                res.status(404).json(
                    {
                        msg: "password"
                    }
                )
            }
        })
        .catch ( err => {
            console.log("error username")
            res.status(404).json(
                {
                    msg: "email"
                }
            )
        })
    }

    static loginGoogle (req, res) {
        console.log("masuk login Google");
        
        let payload
        let { id_token } = req.body
        client.verifyIdToken(
            {
                idToken: id_token,
                audience: "724959796781-ap28tr3iu8j74f1qindip87acg52bk46.apps.googleusercontent.com"
            }
        )
        .then ( ticket => {
            console.log("masuk ticket");
            console.log(ticket)
            
            payload = 
            ticket.getPayload()
            let { email } = payload
            return User.findOne(
                {
                    email
                }
            )
        })
        .then ( result => {
            if (!result) {
                console.log("masuk create");
                
                let { email, name } = payload
                User.create(
                    {
                        email,
                        password: hashPassword(name)
                    }
                )
                .then ( result => {
                    console.log("sukses buat");
                    
                    let token = jwt.generateToken(
                        {
                            _id: result._id,
                            email: result.email
                        }
                    )
                    res.status(201).json(token);
                })
                .catch ( err => {
                    console.log(err)
                    res.status(500).json(err)
                })
            } else {
                console.log("gak masuk create");
                
                let token = jwt.generateToken(
                    {
                        _id: result._id,
                        email: result.email
                    }
                )
                res.status(201).json(token);
            }
            
        })
        .catch(err=>{
            res.status(500).json(err)
          })
    }
}

module.exports = UserController