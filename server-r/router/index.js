const router = require('express').Router()
const userRouter = require('./userRouter')
const todoRouter = require('./todoRouter')

router.get('/', (req,res,next) => {
    res.status(200).json({message:"connected"})
})

router.use('/users', userRouter)
router.use('/todos', todoRouter)

module.exports = router