const router = require('express').Router()
const todoRouter = require('./todoRouter')
const userRouter = require('./userRouter')
// const avatarMiddleware = require('adorable-avatars')
// router.use('/myAvatars',avatarMiddleware) install dulu

router.use('/',todoRouter)
router.use('/',userRouter)

module.exports =router