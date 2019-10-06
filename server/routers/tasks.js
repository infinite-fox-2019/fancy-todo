const router = require('express').Router()
const TaskController = require('../controllers/TaskController')
const {authentication} = require('../middlewares/auth')
const {authorization} = require('../middlewares/auth')

router.use(authentication)
router.get('/', TaskController.findAll)
router.get('/now', TaskController.findNow)
router.post('/', TaskController.create)
router.get('/:id', authorization)
router.patch('/:id', TaskController.update)
router.delete('/:id', TaskController.delete)

module.exports = router