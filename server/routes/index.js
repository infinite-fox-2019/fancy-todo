const route = require('express').Router()
const user = require('./user')
const todo = require('./todo')

route.use('/users',user)
route.use('/todos',todo)

module.exports = route