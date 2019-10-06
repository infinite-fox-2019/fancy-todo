const router = require('express').Router()
const eventbriteRouter = require('./eventbrite')
const eventRouter = require('./event')
const userRouter = require('./user')
const todoRouter = require('./todo')

router.use('/events', eventRouter)
router.use('/users', userRouter)
router.use('/eventbrite', eventbriteRouter)
router.use('/todos', todoRouter)


module.exports = router