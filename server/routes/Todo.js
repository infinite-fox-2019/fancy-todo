
const Router = require('express').Router(),
    TodoController = require('../controllers/Todo'),
    authentication = require('../middleware/authentication'),
    authorizationTodo = require('../middleware/authorizationTodo')

Router.use(authentication)

Router.post('/', TodoController.create)
Router.get('/', TodoController.read)

Router.use('/:todoId', authorizationTodo)

Router.get('/:todoId', TodoController.readOne)
Router.put('/:todoId', TodoController.update)
Router.delete('/:todoId', TodoController.delete)
Router.patch('/:todoId', TodoController.patch)

module.exports = Router;
