const express = require('express')
const router = express()
const UserController = require('../controllers/userController')

router.post('/register', UserController.create)
router.post('/login', UserController.login)
router.post('/signGoogle', UserController.signInGoogle)

module.exports = router