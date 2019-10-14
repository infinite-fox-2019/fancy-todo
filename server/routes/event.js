const router = require('express').Router()
const eventController = require('../controllers/event')
const { Authentication, Authorization } = require('../middlewares/auth')

router.get('/', eventController.find)
router.use(Authentication)
router.post('/', eventController.create)
router.patch('/:id', eventController.join)

module.exports = router