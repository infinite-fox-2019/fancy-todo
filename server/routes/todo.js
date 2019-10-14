const router = require('express').Router()
const todoController = require('../controllers/todo')
const { Authentication, Authorization } = require('../middlewares/auth')

router.use(Authentication)
router.get('/todo', todoController.findTodo)
router.get('/doing', todoController.findDoing)
router.get('/done', todoController.findDone)
router.post('/', Authorization, todoController.create)
router.patch('/doing/:id', Authorization, todoController.toDoing)
router.patch('/done/:id', Authorization, todoController.toDone)
router.put('/:id', Authorization, todoController.update)
router.delete('/:id', Authorization, todoController.delete)

module.exports = router