const router = require('express').Router()
const TodoController = require('../controllers/todoController')

router.get('/',TodoController.read)

module.exports =router