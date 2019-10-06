
const Router = require('express').Router();
const UserController = require('../controllers/User');

Router.post('/register', UserController.create)
Router.post('/login', UserController.login)
Router.get('/verify', UserController.verify)
Router.post('/gsignin', UserController.googleSignIn)

module.exports = Router;