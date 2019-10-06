const express = require('express')
const router = express()
const TodoController = require('../controllers/todoController')
const authentication = require('../middlewares/authentication')
const {authorization} = require('../middlewares/authorization')

router.use(authentication)
router.post('/', TodoController.create)
router.get('/', TodoController.getAll)

router.use('/:id', authorization)
router.get('/:id', TodoController.getOne)
router.delete('/:id',  TodoController.destroy)
router.put('/:id',  TodoController.update)
router.patch('/:id', TodoController.changeStatus)

module.exports = router