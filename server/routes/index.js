const router = require('express').Router()
const userRouter = require('./userRouter')
const avatarMiddleware = require('adorable-avatars')


router.use('/myAvatars',avatarMiddleware)
router.use('/user',userRouter)


module.exports =router