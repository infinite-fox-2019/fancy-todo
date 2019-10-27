const User = require('../models/user')
const {decodeHash} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

class UserController {
  static login(req,res,next){
    const {email,password} = req.body
    User.findOne({email})
      .then(data => {
        if(data && decodeHash(password, data.password)){
          let payload = {name: data.name, email: data.email, _id:data._id}
          let token = generateToken(payload)
          res.status(200).json({"access_token":token, name:data.name, _id:data._id})
        }
        else{
          throw {message:"Invalid password or email", status:400}
        }
      })
      .catch(next)
  }

  static register(req,res,next){
    const {name,email,password} = req.body
    User.create({name,email,password})
      .then(data => {
        res.status(201).json(data)
      })
      .catch(next)
  }
}

module.exports = UserController