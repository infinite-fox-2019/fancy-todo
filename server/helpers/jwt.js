const jwt = require('jsonwebtoken');


const generateToken = (payload) => {
    return jwt.sign(payload, process.env.SALT)
}

const decodeToken = (payload) => {
    return jwt.verify(payload, process.env.SALT)
}


module.exports = {
    generateToken,
    decodeToken
}

