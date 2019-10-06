const router = require('express').Router()
const UserController = require('../controllers/user')
const TodoController = require('../controllers/todo')
const {authentication} = require('../middlewares/auth')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googleSignIn', UserController.googleSignIn)
router.get('/todos', authentication, TodoController.findAll)

module.exports = router