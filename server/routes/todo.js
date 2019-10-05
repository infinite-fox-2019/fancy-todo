const todo = require('express').Router()
const { add,remove,update } = require('../controllers/todoController')
const { authentications,authorizations } = require('../middleware/auth')

todo.post('/add',authentications,add)
todo.delete('/delete',authentications,authorizations,remove)
todo.patch('/update',authentications,authorizations,update)

module.exports = todo