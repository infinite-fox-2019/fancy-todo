
const Router = require('express').Router();
const UserController = require('../controllers/User');
const auth = require('../middleware/authentication')

Router.post('/register', UserController.create)
Router.post('/login', UserController.login)
Router.get('/verify', auth, UserController.verify)
Router.post('/gsignin', UserController.googleSignIn)

module.exports = Router;