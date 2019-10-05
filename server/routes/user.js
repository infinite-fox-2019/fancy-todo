const user = require('express').Router()
const {create,login,find} = require('../controllers/userController')
const error = require('../middleware/errorhandler')
const validator = require('../middleware/validators/userValidator')
const { authentications,authorizations } = require('../middleware/auth')

user.post('/register',validator.createUserValidator,create)
user.post('/login',error,login)
user.get('/find',authentications,authorizations,find)

module.exports = user;