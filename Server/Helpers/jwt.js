const jwt = require('jsonwebtoken');
const secret = process.env.secret

function generateToken(payload) {
    return jwt.sign(payload,secret);
};

function tokenVerify(token) {
    return jwt.verify(token,secret);
};

function sign(userData) {
    return jwt.sign(userData, process.env.JWT_SECRET);
};

module.exports = {
    generateToken,
    tokenVerify,
    sign
}