const router = require('express').Router()
const userController = require('../controllers/userController')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/gsignin', userController.googleLogin)

module.exports = router