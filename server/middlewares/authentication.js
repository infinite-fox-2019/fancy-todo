const { verifyToken } = require('../helpers/jwt')
const User  = require('../models/user')

function authentication(req, res, next) {
  console.log('hereeeeee');
  console.log(req.headers.token);
  try {
    req.decoded = verifyToken(req.headers.token)
    console.log(req.decoded);
    User.findOne({ _id: req.decoded._id })
      .then(result => {
        console.log(result);
        if (!result) {
          next({ status: 401, message: "Unauthorized" })
        } else {
          next()
        }
      })
      .catch(next)
  }
  catch (err) {
    next(err)
  }
}

module.exports = authentication