const { decodeToken } = require('../helpers/jsonwebtoken')
const User = require('../models/user')

function authentication(req, res, next) {
  try {
    let decoded = decodeToken(req.headers.token) // token dari headers
    req.loggedUser = decoded
    User.findOne({
      _id: req.loggedUser.id
    })
    .then(result => {
      // console.log(result, '======> authentication')
      if (!result) {
        next({
          status: 401,
          message: 'Login First'
        })
      } else {
        next()
      }
    })
    // console.log(decoded)
  }
  catch {next}
}

module.exports = {
  authentication
}