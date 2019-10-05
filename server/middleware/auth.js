const {verifyToken} = require('../helpers/jwt')

const authentications = (req,res,next) => {
  console.log(req.body)
  try {
    let decodedToken = verifyToken(req.headers.token)
    req.loggedUser = decodedToken
    next()
  } catch (error) {
    res.status(500).json(error)
  }
}

const authorizations = (req,res,next) =>{
  console.log(req.loggedUser)
  console.log(req.body)
  if (req.loggedUser._id === req.body.userId){
    next()
  } else {
    console.log("masuk err authzz--->>")
    next({status : '403',msg:'not authorize'})
  }
}


module.exports = {authentications,authorizations}