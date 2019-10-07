const EventbriteController = require('../controllers/eventbrite')
const express = require('express')
const router = express.Router()

router.get('/',EventbriteController.getEvents)

module.exports = router