const router = require('express').Router()
const TodoController = require('../controllers/todoController')

router.get('/',TodoController.read)
router.post('/',TodoController.create)
router.put('/update/:id',TodoController.update)
router.delete('/delete/:id',TodoController.delete)
module.exports =router