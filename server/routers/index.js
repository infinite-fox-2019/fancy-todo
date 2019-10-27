const router = require('express').Router()
const usersRouter = require('./user')
const tasksRouter = require('./tasks')

router.get('/', (req, res, next) => {
    res.status(200).json({hello: 'hello'})
})

router.use('/tasks', tasksRouter)
router.use('/users', usersRouter)
module.exports = router