const user = require('express').Router()
const {create,login,find,loginOAuth} = require('../controllers/userController')
const validator = require('../middleware/validators/userValidator')
const { authentications,authorizations } = require('../middleware/auth')

user.post('/register',validator.createUserValidator,create)
user.post('/login',login)
user.get('/find',authentications,find)
user.post('/loginOAuth',loginOAuth)

module.exports = user;