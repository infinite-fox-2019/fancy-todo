const {verifyToken} = require('../helpers/jwt')

const authentications = (req,res,next) => {
  try {
    let decodedToken = verifyToken(req.headers.token)
    req.loggedUser = decodedToken
    next()
  } catch (error) {
    res.status(500).json(error)
  }
}

const authorizations = (req,res,next) =>{
  // disini ambil model todo. cek nya pake model tsb
  if (req.loggedUser._id === req.body.userId){
    next()
  } else {
    next({status : '403',msg:'not authorize'})
  }
}


module.exports = {authentications,authorizations}