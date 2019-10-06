const User = require("../models/user");

class UserController {
  static list(req, res, next) {
    User.find()
      .then(userData => {
        res.status(200).json(userData);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({ email })
      .then(data => {
        if (data && data.password === password) {
          // lempar jwt
          res.status(200).json(token);
        } else {
          // username/email salah
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  static register(req, res, next) {
    const { name, email, password } = req.body;
    User.create({ name, email, password })
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        res.json(err)
      });
  }

  static remove(req, res, next) {
    const { id } = req.params;
    User.deleteOne({ _id: id })
      .then(data => {
        res.status(204).json({ message: "Data deleted" });
      })
      .catch(err => {
        console.log(err);
      });
  }

  static changeName(req, res, next) {
    const { id, name } = req.params;
    User.updateOne({ _id: id }, { name })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static changeEmail(req, res, next) {
    const { id, email } = req.params;
    User.updateOne({ _id: id }, { email })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
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
        console.log(err);
      });
  }
}

module.exports = UserController;
