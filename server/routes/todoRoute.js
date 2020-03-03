const router = require('express').Router()
const TodoController = require('../controllers/todo')
const authentication = require('../middlewares/authenticate')
const authorizeUserTodo = require('../middlewares/authorizeUserTodo')

router.use(authentication)
router.post('/', TodoController.create)
router.get('/', TodoController.getTodos)
router.patch('/:id', authorizeUserTodo, TodoController.update)
router.delete('/:id', authorizeUserTodo, TodoController.delete)

module.exports = router