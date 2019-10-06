const express = require('express')
const TodoController = require('../controllers/todoController')
const router = express.Router()

router.get('/', TodoController.getAll)

router.get('/done', TodoController.getDone)

router.get('/undone', TodoController.getUndone)

router.post('/find', TodoController.findTodo)

router.post('/token', TodoController.getWithToken)

router.post('/', TodoController.addTodo)

router.post('/googleCalendar', TodoController.googleCalendar)

router.patch('/done/:id', TodoController.todoDone)

router.patch('/undone/:id', TodoController.todoUndone)

router.delete('/done', TodoController.deleteDone)

router.delete('/:id', TodoController.deleteOne)

module.exports = router