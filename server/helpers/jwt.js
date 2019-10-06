const jwt = require("jsonwebtoken");

function generateToken(RAWpayload) {
  const payload = {
    _id: String(RAWpayload._id),
    name: RAWpayload.name,
    email: RAWpayload.email
  };
  return jwt.sign(payload, process.env.SECRETJWT);
}

function decodeToken(token) {
  console.log(token)
  return jwt.verify(token, process.env.SECRETJWT);
}

module.exports = { generateToken, decodeToken };
