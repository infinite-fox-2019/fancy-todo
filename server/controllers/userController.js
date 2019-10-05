const userModel = require("../models/user");
const todosModel = require("../models/todo")
const generateHash = require("../helpers/bcrypt").generateHash;
const compareHash = require("../helpers/bcrypt").compareHash;
const generateToken = require("../helpers/jwt").generateToken;

class User {
  static async create(req, res, next) {
    let { username, password, email } = req.body;
    try {
      const emailFind = await userModel.findOne({ email });
      if (emailFind) {
        let msg = "email already in use";
        return res.status(409).json(msg);
      } else {
        let hash = generateHash(password);
        const newUser = await userModel.create({ username, hash, email });
        return res.status(200).json(newUser);
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
        let {username,email,hash,_id} = emailFind
        if (compareHash(password, hash)) {
          let payload = { username, email,_id };
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
}

module.exports = User;
