const {decodeToken} = require('../helpers/jwt')
const Todo = require('../models/todo')

function authentication(req,res,next){
  const {authorization} = req.headers
  if(authorization){
    req.loggedUser = decodeToken(authorization)
    next()
  }
  else{
    res.status(400).json({message:"Invalid Authentication"})
  }
}

function authorizationForTheirTodo(req,res,next){
  const UserId = req.loggedUser._id
  const {_id} = req.params //Todo ID
  Todo.findOne({_id})
    .then(data => {
      console.log(data, "from auth")
      console.log(req.loggedUser)
      if(data){
        if(data.UserId == UserId){
          next()
        }
        else{
          res.status(400).json({message:"Invalid Authorization"})
        }
      }
      else{
        res.status(400).json({message:"Data Not Found"})
      }
    })
    .catch(next)
}


module.exports = {
  authentication,
  authorizationForTheirTodo
}
