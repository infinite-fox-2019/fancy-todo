const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const { authentication, authorization } = require('../middleware/auth')

router.get('/', authentication, TodoController.find)
router.post('/', authentication, TodoController.create)
router.get('/:id', authentication, authorization, TodoController.findById)
router.delete('/:id', authentication, authorization, TodoController.deleteOne)
router.patch('/:id', authentication, authorization, TodoController.updatePatch)

module.exports = router