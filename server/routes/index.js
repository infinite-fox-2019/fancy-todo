const router = require('express').Router()
const eventbriteRouter = require('./eventbrite')
const eventRouter = require('./event')
const userRouter = require('./user')

router.use('/events', eventRouter)
router.use('/users', userRouter)
router.use('/eventbrite', eventbriteRouter)

module.exports = router