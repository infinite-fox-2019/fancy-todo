'use strict'

const express = require('express')
const { TodoController } = require('../controllers')
const authTodo = require('../middlewares/authTodo')
const router = express.Router()

router.post('/', TodoController.create)
router.get('/', TodoController.getAll)
router.patch('/:id', authTodo, TodoController.edit)
router.delete('/:id', authTodo, TodoController.remove)

module.exports = router
