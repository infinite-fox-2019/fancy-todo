const express = require('express')
const todoRoutes = require('./todoRoutes')
const userRoutes = require('./userRoutes')
const router = express.Router()

router.use('/todos', todoRoutes)

router.use('/users', userRoutes)

module.exports = router