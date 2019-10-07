const jwt = require('jsonwebtoken')

const encodeToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    return token
}

const decodeToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { encodeToken, decodeToken }