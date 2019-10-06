const router = require("express").Router()
const {authentication, authorization, authorization2} = require("../middlewares/auth")

const TodoController = require("../controllers/todoController")
router.get('/allTodo', authentication, authorization,TodoController.allTodo)
router.post('/addTodo', authentication, authorization,TodoController.addTodo)
router.delete('/deleteTodo',authentication, authorization,TodoController.deleteTodo)
router.put('/updateTodo', authentication, authorization,TodoController.updateTodo)
router.patch('/statusTodo', authentication, authorization,TodoController.statusTodo)

module.exports = router
