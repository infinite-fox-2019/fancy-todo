const { verifyToken } = require('../helpers/jwt')

module.exports = (req, res, next) => {
  try {
    const decode = verifyToken(req.headers.token)
    req.loggedUser = decode
    next()
  }
  catch (err) {
    next(err)
  }
}