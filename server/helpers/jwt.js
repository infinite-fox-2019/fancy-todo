const jwt = require('jsonwebtoken')


function generateToken(payload){
  return jwt.sign(payload,'ToDoFancy')
}

function verifyToken(token){
  return jwt.verify(token,'ToDoFancy') 
}

module.exports = {
    generateToken,
    verifyToken
}