const User = require('../models/user')
const { comparePassword } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jsonwebtoken')

class UserController {
  static register(req, res, next) {
    const { email, username, password } = req.body
    User
      .create({
        email,
        username,
        password
      })
      .then(user => {
        const payloads = {
          id: user._id,
          email: user.email,
          username: user.username
        }
        const token = generateToken(payloads)
        res.status(200).json({token})
      })
      .catch(next)
  }
  static login(req, res, next) {
    const {email, password} = req.body
    User
      .findOne({email})
      .then(user => {
        if (!user) {
          next({
            status: 403,
            msg: 'not registered'
          })
        } else {
          if (!comparePassword(password, user.password)) {
            next({
              status: 403,
              msg: 'wrong email/password'
            })
          } else {
            const payloads = {
              id: user._id,
              email: user.email,
              username: user.username
            }
            const token = generateToken(payloads)
            res.status(200).json({token})
          }
        }
      })
  }
  static googleSignIn(req, res, next) {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let payload;
    client
      .verifyIdToken({
        idToken: req.headers.id_token,
        audience: process.env.CLIENT_ID
      })
      .then(ticket => {
        payload = ticket.getPayload();

        return User.findOne({
          email: payload.email
        });
      })
      .then(user => {
        if (!user) {
          //create new user
          return User.create({
            name: payload.name,
            email: payload.email,
            password: String(Math.floor(Math.random() * 99999999))
          });
        } else {
          //user already exist
          return user;
        }
      })
      .then(user => {
        const token = generateToken({
          name: payload.name,
          email: payload.email,
          _id: user._id
        });
        res.status(200).json({
          token
        });
      })
      .catch(next);
  }
}

module.exports = UserController