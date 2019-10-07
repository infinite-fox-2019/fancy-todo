const router = require('express').Router();

const todoRouter = require('./todoRouter')
const userRouter = require('./userRouter')

router.use('/users', userRouter)
router.use('/todos', todoRouter)

module.exports = router;