const routes = require('express').Router();
const userRouter = require('../routes/user')
const todoRouter = require('../routes/todo')

routes.use('/users', userRouter)
routes.use('/todo', todoRouter)

module.exports = routes