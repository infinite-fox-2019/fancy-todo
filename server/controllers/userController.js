const User = require("../models/user");
const { generateToken } = require("../helpers/jwt");
const { hashPassword, decodePassword } = require("../helpers/bcrypt");

class UserController {
  static list(req, res, next) {
    User.find()
      .then(userData => {
        res.status(200).json(userData);
      })
      .catch(err => {
        next(err);
      });
  }

  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({ email })
      .then(data => {
        if (data && decodePassword(password, data.password)) {
          let token = generateToken(data);
          res.status(200).send(token);
        } else {
          res.status(400).json({ message: "Password/EmailSalah" });
        }
      })
      .catch(err => {
        next(err);
      });
  }

  static register(req, res, next) {
    const { name, email, password } = req.body;
    let hash = hashPassword(password);
    User.create({ name, email, password: hash })
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        next(err);
      });
  }

  static remove(req, res, next) {
    const { id } = req.params;
    User.deleteOne({ _id: id })
      .then(data => {
        res.status(204).json({ message: "Data deleted" });
      })
      .catch(err => {
        next(err);
      });
  }

  static changeName(req, res, next) {
    const { id, name } = req.params;
    User.updateOne({ _id: id }, { name })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        next(err);
      });
  }

  static changeEmail(req, res, next) {
    const { id, email } = req.params;
    User.updateOne({ _id: id }, { email })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        next(err);
      });
  }

  static changePassword(req, res, next) {
    const { id } = req.params;
    const { password } = req.body;
    User.updateOne({ _id: id }, { password })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = UserController;
