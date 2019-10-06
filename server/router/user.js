const router = require('express').Router()
const User = require('../controller/user')
const {authentication} = require('../middlewares/auth')


router.post('/register' , User.register)
router.post('/login', User.login)
router.post('/google-login', User.googleLogin)
router.get('/', authentication ,User.findOne)
router.patch('/delete', authentication, User.deleteTodo)


module.exports = router