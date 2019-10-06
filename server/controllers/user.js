const User = require('../models/user')
const { checkPassword, hashPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')

class UserController {
  static register(req, res, next) {
    const { username, password, email } = req.body

    User
      .create({
        username,
        password,
        email
      })
      .then(_ => {
        res.status(201).json({ message: 'User created' })
      })
      .catch(next)
  }

  static login(req, res, next) {
    console.log(req.body)
    
    const { email, password } = req.body

    User
      .findOne({ email })
      .then(user => {
        if (user && checkPassword(password, user.password)) {
          const payload = {
            _id: user._id,
            email: user.email
          }
          const token = generateToken(payload)
          res.status(200).json({ token, username: user.username })
        } else if (user) {
          res.status(404).json({ message: 'Invalid Password' })
        } else {
          res.status(404).json({ message: 'User does not exist' })
        }
      })
      .catch(next)

  }

  static loginGoogle(req, res, next) {
    const { token } = req.body
    const client = new OAuth2Client(process.env.GTOKEN)
    let userData
    client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
      .then(ticket => {
        userData = ticket.payload
        return User.findOne({ email: userData.email })
      })
      .then(user => {
        if (user) return user
        else {
          return User.create({
            username: userData.given_name,
            email: userData.email,
            password: hashPassword('ngantukpakde')
          })
        }
      })
      .then(user => {
        const payload = {
          _id: user._id,
          email: user.email
        }

        const token = generateToken(payload)
        res.status(200).json({ token, username: user.username })
      })
      .catch(next)
  }

}

module.exports = UserController