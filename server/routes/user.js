const routes = require('express').Router();
const userController = require('../controllers/user')

// router.post('/register', userController.register)
// router.post('/login', userController.login)
routes.post('/logingoogle', userController.loginGoogle)

module.exports = routes