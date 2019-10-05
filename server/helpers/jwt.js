const jwt = require('jsonwebtoken')

generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET)
}

decodeToken = (token) => {
    return jwt.decode(token)
}

module.exports = {
    generateToken,
    decodeToken
}