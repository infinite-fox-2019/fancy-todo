const router = require('express').Router()
const {authentication} = require('../middlewares/auth')
const {authorization} = require('../middlewares/auth')
const Todo = require('../controller/todo')

router.post('/create', authentication, Todo.create)
router.patch('/update', authentication, authorization,Todo.update)
router.get('/find', authentication, Todo.find)
router.delete('/delete', authentication, authorization, Todo.delete)

module.exports = router
