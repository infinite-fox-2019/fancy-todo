const router = require('express').Router()
const ToDoController = require('../controllers/todoController')

router.put('/content', ToDoController.updateContent)
router.delete('/content', ToDoController.deleteContent)
router.post('/content', ToDoController.createContent)
router.patch('/', ToDoController.updateToDo)
router.get('/', ToDoController.findAll)
router.post('/', ToDoController.createToDo)
router.delete('/', ToDoController.deleteToDo)

module.exports = router