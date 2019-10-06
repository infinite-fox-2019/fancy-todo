const router = require('express').Router()
const UserController = require('../controllers/UserController')
const {authentication} = require('../middlewares/auth')
const {authorization} = require('../middlewares/auth')

router.post('/signUp', UserController.signUp)
router.post('/signIn', UserController.signIn)
router.post('/googleSignIn', UserController.googleSignIn)
router.patch('/', authentication, UserController.update)
router.get('/', authentication, UserController.findOne)
module.exports = router