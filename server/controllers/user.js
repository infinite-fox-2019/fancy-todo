const User = require('../models/user')
const { checkPassword, hashPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')


class UserController {
  static register(req, res, next) {
    const { username, password, email } = req.body

    User
      .create({
        username,
        password,
        email
      })
      .then(_ => {
        res.status(201).json({ message: 'User created' })
      })
      .catch(next)
  }

  static login(req, res, next) {
    const { email, password } = req.body

    User
      .findOne({ email })
      .then(user => {
        if (user && checkPassword(password, user.password)) {
          const payload = {
            id: user._id,
            email: user.email
          }
          const token = generateToken(payload)
          res.status(200).json({ token, username: user.username })
        } else if (user) {
          res.status(404).json({ message: 'Invalid Password' })
        } else {
          res.status(404).json({ message: 'User does not exist' })
        }
      })
      .catct(next)

  }

  static loginGoogle(req, res, next) {

  }

}

module.exports = UserController