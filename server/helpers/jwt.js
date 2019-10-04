const jwt = require('jsonwebtoken')

module.exports = {

    generateToken(payload) {
        return jwt.sign(payload)
    },

    verify(token) {
        return jwt.verify(token, process.env.JWT_SECRET)
    }
}