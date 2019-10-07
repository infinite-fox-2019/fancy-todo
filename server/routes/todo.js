const router = require('express').Router()
const todoController = require('../controllers/todo')

router.get('/todo', todoController.findTodo)
router.get('/doing', todoController.findDoing)
router.get('/done', todoController.findDone)
router.post('/', todoController.create)

module.exports = router