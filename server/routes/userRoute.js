const UserController = require('../controllers/userController')
const router = require('express').Router()

router.post('/gLogin', UserController.gLogin)
router.post('/login', UserController.regularLogin)
router.post('/register', UserController.register)
router.patch('/password', UserController.updatePassword)


module.exports = router