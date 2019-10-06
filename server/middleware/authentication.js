const { decodeToken } = require("../helpers/jwt");

function middlewareLogin(req, res, next) {
  const { authorization } = req.headers;
  console.log(req.headers)
  if (authorization) {
    req.loggedUser = decodeToken(authorization);
    next();
  } else {
    res.status(400).json({ message: "Token invalid" });
  }
}

module.exports = middlewareLogin;
