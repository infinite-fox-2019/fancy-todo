const {verifyToken} = require ('../helpers/jwt') 


const authentication = (req, res , next) => {
  try {
    const decode = verifyToken(req.headers.accesstoken)
    req.user = decode
    console.log(req.user.id)
    next()
  }
  catch (err){
    next(err)
  }
}

module.exports = authentication