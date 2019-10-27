const route = require('express').Router()
const userRoute = require('./userRoute')
const todoRoute = require('./todoRoute')
const { authentication } = require('../middlewares/auth')

route.use('/users', userRoute)
route.use('/todos', authentication ,todoRoute)

module.exports = route