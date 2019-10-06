const router = require('express').Router()
const userRoute = require('./userRoute')
const todoRoute = require('./todoRoute')

router.use('/user', userRoute)
router.use('/todo', todoRoute)

module.exports = router