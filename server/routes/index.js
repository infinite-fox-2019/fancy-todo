const express = require('express')
const router = express.Router()
const userRoute = require('./user')
const planRoute = require('./plan')
const eventbriteRoute = require('./eventbrite')
const itineraryRoute = require('./itinerary')
const googleRoute = require('./google')

router.use('/users', userRoute)
router.use('/plans', planRoute)
router.use('/itineraries', itineraryRoute)
router.use('/eventbrite', eventbriteRoute)
router.use('/google', googleRoute)

module.exports = router