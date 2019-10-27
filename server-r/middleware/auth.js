const {decodeToken} = require('../helpers/jwt')

function authentication(req,res,next){
  const {authorization} = req.headers
  if(authorization){
    req.loggedUser = decodeToken(authorization)
    next()
  }
  else{
    res.status(400).json({message:"Authentication failed"})
  }
}


module.exports = {
  authentication
}
