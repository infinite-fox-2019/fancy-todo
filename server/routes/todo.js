const router = require('express').Router()
const todoController = require('../controllers/todo')

router.get('/todo', todoController.findTodo)
router.get('/doing', todoController.findDoing)
router.get('/done', todoController.findDone)
router.post('/', todoController.create)
router.patch('/doing/:id', todoController.toDoing)
router.patch('/done/:id', todoController.toDone)

module.exports = router