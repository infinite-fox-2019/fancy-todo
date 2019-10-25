'use strict'

const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

module.exports = {
  authentication (req, res, next) {
    try {
      req.decode = verifyToken(req.headers.token)
      console.log(req.decode.id)
      User.findOne({ _id: req.decode.id })
        .then((result) => {
          if (!result) {
            next({ status: 404, message: 'Could not find user in the database!' })
          } else {
            next()
          }
        }).catch(_ => {
          next({ status: 500, message: 'Internal Server Error' })
        })
    } catch (err) {
      next({ status: 401, message: 'You must sign in first!' })
    }
  }
}
