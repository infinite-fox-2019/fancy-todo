const jwt = require('jsonwebtoken')
const secret = 'secret'

function getToken(payload) {
  return jwt.sign(payload, secret)
}

function verifyToken(payload) {
  return jwt.verify(payload, secret)
}

module.exports = {
  getToken,
  verifyToken
}