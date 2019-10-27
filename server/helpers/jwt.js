const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
module.exports = {

    generateToken(payload) {
        return jwt.sign(payload, secret)
    },

    verify(token) {
        console.log(jwt.verify(token, secret));
        return jwt.verify(token, secret)
    }
}