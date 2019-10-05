const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.post('/signUp', UserController.signUp)
router.post('/signIn', UserController.signIn)
router.post('/googleSignIn', UserController.googleSignIn)
module.exports = router