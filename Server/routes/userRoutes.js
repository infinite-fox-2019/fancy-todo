const express = require('express')
const UserController = require('../controllers/userController')

const router = express.Router()

router.post('/login', UserController)

router.post('/register', UserController.createOne)

router.post('/oauth', UserController.oauth)

module.exports = router