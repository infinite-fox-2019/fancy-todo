const router = require('express').Router()
const userRoute = require('./userRoute')
const todoRoute = require('./todoRoute')

router.use('/users', userRoute)
router.use('/todos', todoRoute)

module.exports = router