const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const { authentication, authorization } = require('../middleware/auth')

router.get('/show', authentication, TodoController.find)
// 

module.exports = router