const router = require('express').Router()
const todoController = require('../controllers/todo')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.get('/', todoController.findAll)
router.get('/:id', todoController.findOne)
router.post('/', todoController.create)
router.patch('/:id', todoController.update)
router.delete('/:id', todoController.deleteOne)

module.exports = router