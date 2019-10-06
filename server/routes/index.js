const router = require('express').Router()
const todoRouter = require('./todoRouter')
const userRouter = require('./userRouter')
const avatarMiddleware = require('adorable-avatars')


router.use('/myAvatars',avatarMiddleware)
router.use('/todo',todoRouter)
router.use('/user',userRouter)


module.exports =router