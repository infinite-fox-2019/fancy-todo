const router = require('express').Router()
const todoController = require('../controllers/todoController')
const isLogin = require('../middlewares/isLogin')
const authorized = require('../middlewares/authorized')

router.use(isLogin)

router.get('/', isLogin, todoController.findAll)
router.post('/', isLogin, todoController.create)
router.patch('/:id', isLogin, authorized, todoController.update)
router.delete('/:id', isLogin, authorized, todoController.delete)

module.exports = router
