const router = require('express').Router()
const UserController = require('../controllers/userController')

router.get('/register',UserController.register)
router.get('/login',UserController.login)

// router.post('/signGoogle',UserController.signGoogle)
// router.get('/authentication', authentication, UserController.authentication)

module.exports =router