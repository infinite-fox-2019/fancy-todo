const Todos = require('express').Router()
const TodosControllers = require('../controllers/todos')
const { authentication, authorization } = require('../middleware/auth')

Todos.post('/',authentication, TodosControllers.create)
Todos.get('/', authentication,TodosControllers.find)
Todos.get('/today', authentication,TodosControllers.today)
Todos.get('/search/:title', authentication,TodosControllers.search)
Todos.get('/:id',authentication,authorization, TodosControllers.findOne)
Todos.delete('/delete/:id',authentication, authorization, TodosControllers.deleted)
Todos.patch('/update/:id',authentication, authorization, TodosControllers.update)

module.exports = Todos
