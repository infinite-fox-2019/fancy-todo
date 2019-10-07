// STATE VARIABLES
const router = require('express').Router()
const userController = require('../controllers/user')

router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.post('/register', userController.register)
router.post('/googleSignIn', userController.googleSignIn)

module.exports = router