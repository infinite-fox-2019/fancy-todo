const routes = require('express').Router();
const userController = require('../controllers/user')

routes.post('/register', userController.register)
routes.post('/login', userController.login)
routes.post('/logingoogle', userController.loginGoogle)

module.exports = routes