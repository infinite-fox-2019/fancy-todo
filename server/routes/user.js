const UserController = require('../controllers/user')
const express = require('express')
const router = express.Router()

router.post('/register',UserController.register)

router.post('/login',UserController.login)

router.get('/',UserController.read)

router.get('/search',UserController.find)

router.delete('/:id',UserController.delete)

router.patch('/:id',UserController.update)

module.exports = router