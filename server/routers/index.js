const router = require('express').Router()
const todosRouter = require('./todos')

router.get('/', (req, res, next) => {
    res.status(200).json({hello: 'hello'})
})

router.use('/todos', todosRouter)
module.exports = router