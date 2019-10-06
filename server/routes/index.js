const router = require('express').Router()
const UserRoutes = require('./userRoutes')
const TodoRoutes = require('./todoRoutes')

router.use('/users', UserRoutes)
router.use('/todos', TodoRoutes)

module.exports = router