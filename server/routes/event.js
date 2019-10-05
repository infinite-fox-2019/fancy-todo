const router = require('express').Router()
const eventController = require('../controllers/event')

router.get('/', eventController.find)

module.exports = router