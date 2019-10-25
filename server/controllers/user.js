'use strict'

const { OAuth2Client } = require('google-auth-library')
const { generateToken } = require('../helpers/jwt')
const { checkPassword } = require('../helpers/bcryptjs')
const { User } = require('../models')

class UserController {
  static getAll (req, res, next) {
    User.find().populate('todoList')
      .then((result) => {
        res.status(200).json(result)
      }).catch(next)
  }

  static findOne (req, res, next) {
    const email = req.params.email
    User.findOne({ email })
      .then((result) => {
        res.status(200).json(result)
      }).catch(next)
  }

  static register (req, res, next) {
    const { username, email, password } = req.body
    // console.log(newUser) -> name: "Admin", email: "admin@fancytodo.com", password:"admin"
    User.create({ username, email, password })
      .then((user) => {
        // console.log(user) // -> balikannya Object User dengan password yang sudah di hash
        const payload = {
          id: user._id,
          username: user.username,
          email: user.email
        }
        const token = generateToken(payload)
        res.status(201).json({
          message: 'Successfully registered',
          token: token
        })
      })
      .catch(next)
  }

  static login (req, res, next) {
    const { email, password } = req.body
    User.findOne({ email })
      .then((user) => {
        // Return a User object according to email
        if (user) {
          if (checkPassword(password, user.password)) {
            /// Create token using jsonwebtoken
            const payload = {
              id: user._id,
              email: user.email
            }
            const token = generateToken(payload)
            console.log(token)
            res.status(200).json({ message: 'User successfully signed in', token })
          } else {
            next({ status: 404, message: 'Username/password is invalid!' })
          }
        } else {
          next({ status: 404, message: 'Username/password is invalid!' })
        }
      }).catch(next)
  }

  static loginGoogle (req, res, next) {
    let payload = null
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    client.verifyIdToken({
      idToken: req.body.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
      .then((ticket) => {
        payload = ticket.getPayload()
        return User.findOne({ email: payload.email })
      })
      .then((user) => {
        if (user) {
          console.log('User is already registered in the server')
          return user
        } else {
          console.log('Create new user!')
          return User.create({
            username: payload.name,
            email: payload.email,
            password: process.env.DEFAULT_PASSWORD
          })
        }
      })
      .then((user) => {
        payload = { id: user._id, email: user.email }
        const token = generateToken(payload)
        res.status(201).json({
          message: 'Successfully logged in', token
        })
      })
      .catch(next)
  }
}

module.exports = UserController
