const router = require('express').Router()
const UserController = require('../controllers/UserController')
const { authentication, authorization } = require('../middleware/auth')

router.post('/register', UserController.register)
router.post('/manualLogin', UserController.manualLogin)
router.post('/googleLogin', UserController.googleLogin)

module.exports = router