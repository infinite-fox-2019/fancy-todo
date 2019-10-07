const router = require('express').Router();
const todoController = require('../Controllers/todoController');
const authen = require('../Middlewares/authentification')


router.get('/', authen, todoController.findUserTodo);
router.post('/', authen, todoController.createTodo)
router.delete('/:id/delete', authen, todoController.deleteTodo)
router.put('/:id/update', authen, todoController.updateTodo);
router.put('/:id/updatestatus', authen, todoController.updateStatus)

module.exports = router