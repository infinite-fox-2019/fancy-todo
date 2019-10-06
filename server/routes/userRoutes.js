const router = require('express').Router()
const UserController = require('../controllers/UserController')
const {authentication, authorization} = require('../middlewares/auth')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/signGoogle', UserController.signGoogle)
router.get('/authentication', authentication, UserController.authentication)

router.patch('/addToDoText', authentication, authorization, UserController.addToDoText)
router.get('/allToDoList', authentication, authorization, UserController.allToDoList)
router.patch('/updateToDo', authentication, authorization, UserController.updateToDo)
router.patch('/delToDo',authentication, authorization,UserController.delToDo)

module.exports = router