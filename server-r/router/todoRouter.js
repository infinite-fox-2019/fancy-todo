const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const {authentication} = require('../middleware/auth')

router.use(authentication)
router.get('/', TodoController.listTodo)
router.get('/:_id', TodoController.findTodo)
router.post('/', TodoController.createTodo)
// router.use(authorization) // Authoriation here
router.patch('/:_id', TodoController.updateTodo)
router.delete('/:_id', TodoController.removeTodo)

module.exports = router