const router = require('express').Router()
const eventController = require('../controllers/eventbrite')

router.get('/', eventController.find)

module.exports = router