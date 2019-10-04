const UserController = require('../controllers/userController')
const router = require('express').Router()

router.get('/gLogin', UserController.gLogin)
router.get('/login', UserController.regularLogin)


module.exports = router