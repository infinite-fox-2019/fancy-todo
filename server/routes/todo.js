const routes = require('express').Router()
const todoController = require('../controllers/todo')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

routes.get('/findall', authentication, todoController.findAll)
routes.get('/findevent', authentication, todoController.findEvent)
routes.post('/create', authentication, todoController.create)
routes.patch('/update/:id', authentication, authorization, todoController.update)
routes.delete('/delete/:id', authentication, authorization, todoController.delete)

module.exports = routes