const jwt = require('jsonwebtoken')

function generateToken(payload){
  return jwt.sign(payload,process.env.SECRET_KEY)
}

function verifyToken(token){
  let test = jwt.verify(token,process.env.SECRET_KEY)
  return test
}

module.exports = {generateToken,verifyToken}