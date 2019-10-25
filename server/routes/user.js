'use strict'

const express = require('express')
const { authentication } = require('../middlewares/authentication')
const { UserController } = require('../controllers')
const router = express.Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/logingoogle', UserController.loginGoogle)

router.use(authentication)
router.get('/', UserController.getAll)
router.get('/:email', UserController.findOne)

module.exports = router
