const User = require('../models/user')
const { comparePassword } = require('../helpers/bcrypt')
const { getToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')
const clientID = process.env.GOOGLE_CLIENT_ID
const client = new OAuth2Client(clientID)
const defaultPas = process.env.DEFAULT_PS

class UserController {
  static create(req, res, next) {
    const { name, email, password } = req.body
    // console.log(req.body);
    User.create({
      name,
      email,
      password,
    })
      .then(data => {
        const {_id} = data
        res.status(201).json({
          message: 'Your account success created',
          _id, name, email,
          token : getToken({_id : data._id, email : data.email})
        })
      })
      .catch(next)
  }
  static login(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      next({
        status: 400,
        message: 'Email/Password is required'
      })
    }
    else {
      User.findOne({ email })
        .then(result => {
          if (result && comparePassword(password, result.password)) {
              const { _id, email } = result
              res.status(200).json({
                token: getToken({_id, email}),
                _id
              })
            }
            else {
              next({
                status: 400,
                message: 'Wrong email/password'
              })
            }
        })
        .catch(next)
    }

  }
  static signInGoogle(req, res, next) {
    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: clientID
    })
      .then(user => {
        // console.log('1 disini')
        let password = defaultPas
        let { email, name } = user.payload
        User.findOne({ email })
        .then(isFound => {
          if (isFound) {
              return isFound
            }
            else {
              return User.create({
                name : name,
                email : email,
                password
              })
            }
          })
          .then(userLogin => {
            // console.log(userLogin);
            let payload = {
              _id: userLogin._id,
              email: userLogin.email
            }
            // console.log('buat token');
            let token = getToken(payload)
            // console.log(token);
            res.status(200).json({
              token,
              _id : userLogin._id
            })
          })
      })
      .catch(next)
  }
}

module.exports = UserController