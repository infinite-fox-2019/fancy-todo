const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const {authentication} = require('../middleware/auth')

router.use(authentication)
router.get('/', TodoController.listTodo)
router.post('/', TodoController.createTodo)

module.exports = router