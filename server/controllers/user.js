const { OAuth2Client } = require("google-auth-library");
const { User } = require("../models");
const { compareHash } = require("../helpers/bcryptjs");
const { generateToken } = require("../helpers/jsonwebtoken");

class UserController {
  static register(req, res, next) {
    const { name, email, password } = req.body;
    User.create({
      name,
      email,
      password
    })
      .then(user => {
        const payload = {
          _id: user._id,
          name: user.name,
          email: user.email
        };
        let token = generateToken(payload);
        res.status(200).json({
          token
        });
      })
      .catch(next);
  }

  static login(req, res, next) {
    const { email, password } = req.body;
    console.log(password);
    User.findOne({
      email
    })
      .then(user => {
        if (!user || !compareHash(password, user.password)) {
          next({
            statusCode: 400,
            msg: `invalid username / password !`
          });
        } else {
          const payload = {
            _id: user._id,
            name: user.name,
            email: user.email
          };

          let token = generateToken(payload);

          res.status(200).json({
            token
          });
        }
      })
      .catch(next);
  }

  static googleSignIn(req, res, next) {
    const client = new OAuth2Client(process.env.CLIENT_ID);

    let payload;
    client
      .verifyIdToken({
        idToken: req.headers.id_token,
        audience: process.env.CLIENT_ID
      })
      .then(ticket => {
        payload = ticket.getPayload();

        return User.findOne({
          email: payload.email
        });
      })
      .then(user => {
        if (!user) {
          //create new user
          return User.create({
            name: payload.name,
            email: payload.email,
            password: String(Math.floor(Math.random() * 99999999))
          });
        } else {
          //user already exist
          return user;
        }
      })
      .then(user => {
        const token = generateToken({
          name: payload.name,
          email: payload.email,
          _id: user._id
        });
        res.status(200).json({
          token
        });
      })
      .catch(next);
  }
}

module.exports = UserController;
