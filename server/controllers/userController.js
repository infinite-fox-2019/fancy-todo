const userModel = require("../models/user");
const todosModel = require("../models/todo")
const generateHash = require("../helpers/bcrypt").generateHash;
const compareHash = require("../helpers/bcrypt").compareHash;
const generateToken = require("../helpers/jwt").generateToken;
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID)

class User {
  static async create(req, res, next) {
    let { name, password, email } = req.body;
    try {
      const emailFind = await userModel.findOne({ email });
      if (emailFind) {
        let msg = "email already in use";
        return res.status(409).json(msg);
      } else {
        let hash = generateHash(password);
        const newUser = await userModel.create({ name, hash, email });
        let nameJWT = newUser.name
        let emailJWT = newUser.email
        let idJWT = newUser._id
        let payload = {
          name : nameJWT,
          email : emailJWT,
          _id : idJWT
        }
        let token = generateToken(payload)
        return res.status(200).json(token);
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async login(req, res, next) {
    let {email,password} = req.body
    try {
      const emailFind = await userModel.findOne({email})
      if (emailFind){
        let {name,email,hash,_id} = emailFind
        if (compareHash(password, hash)) {
          let payload = { name, email,_id };
          let token = generateToken(payload);
          return res.status(200).json(token);
        } else {
          let msg = "wrong email/password";
          return res.status(401).json(msg);
        }
      } else {
        let msg = "wrong email/password";
        return res.status(401).json(msg);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async find(req,res,next){
    try {
      let id = req.loggedUser._id
      const todos = await userModel.findById(id).populate('todoList')
      return res.status(200).json(todos)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  static async loginOAuth(req,res,next){
    let { id_token } = req.body
    let payloadJWT
    try {
      const tiket = await client.verifyIdToken({
        idToken : id_token,
        audience : process.env.CLIENT_ID
      })
      const payload = tiket.getPayload()
      console.log(payload)
      const { email, name } = payload
      payloadJWT = { email,name }
      const emailFind = await userModel.findOne({email})
      if(emailFind){
        let token = generateToken(payloadJWT)
        res.status(200).json(token)
      } else {
        next({status : 500, msg : 'email not found'})
      }
    } catch (error) {
      res.status(500).json(error)
    }    
  }

}

module.exports = User;
