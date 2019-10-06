const router = require('express').Router()
const userRoute = require('./userRoute')
const todoRoute = require('./todoRoute')
const projectRoute = require('./projectRoute')

router.use('/user', userRoute)
router.use('/todo', todoRoute)
router.use('/project', projectRoute)

module.exports = router