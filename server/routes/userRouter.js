const router = require('express').Router()
const UserController = require('../controllers/userController')
const {authentication, authorization} = require('../middlewares/auth')

router.get('/',authentication,authorization,UserController.dataUser)
router.post('/register',UserController.register)
router.post('/login',UserController.login)
router.post('/signGoogle',UserController.signGoogle)
router.get('/allTodo',authentication,authorization,UserController.allTodo)
router.patch('/addTodo',authentication,authorization,UserController.addTodo)
router.patch('/deleteTodo',authentication,authorization,UserController.deleteTodo)
router.patch('/updateTodo',authentication,authorization,UserController.updateTodo)
router.get('/authentication', authentication, UserController.authentication)

module.exports =router