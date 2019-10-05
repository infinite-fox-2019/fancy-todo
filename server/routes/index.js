const routes = require('express').Router();
const userRouter = require('../routes/user')
routes.use('/users', userRouter)

module.exports = routes