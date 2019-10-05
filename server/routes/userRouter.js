const router = require('express').Router()
const UserController = require('../controllers/userController')
const {authentication, authorization} = require('../middlewares/auth')

router.post('/register',UserController.register)
router.post('/login',UserController.login)

// router.post('/signGoogle',UserController.signGoogle)
// router.get('/authentication', authentication, UserController.authentication)

module.exports =router