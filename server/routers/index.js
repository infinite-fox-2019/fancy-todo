const router = require('express').Router()
const usersRouter = require('./user')
const todosRouter = require('./todos')

router.get('/', (req, res, next) => {
    res.status(200).json({hello: 'hello'})
})

router.use('/todos', todosRouter)
router.use('/users', usersRouter)
module.exports = router