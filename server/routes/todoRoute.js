const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const { authentication, authorization } = require('../middleware/auth')

router.get('/show', authentication, TodoController.find)
router.post('/create', authentication, TodoController.create)
router.get('/showOne/:id', authentication, authorization, TodoController.findById)
router.patch('/update/:id', authentication, authorization, TodoController.updatePatch)
router.delete('/delete/:id', authentication, authorization, TodoController.deleteOne)

module.exports = router