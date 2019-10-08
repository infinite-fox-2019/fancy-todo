const router = require('express').Router()
const TodoController = require('../controllers/todo')
const {authentication} = require('../middlewares/auth')

router.use(authentication)
router.post('/add', TodoController.create)
router.get('/find', TodoController.findAll)
router.post('/changeStatus/:id', TodoController.update)

module.exports = router