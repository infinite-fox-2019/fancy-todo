const router = require('express').Router()
const avatarMiddleware = require('adorable-avatars')
const userRoutes = require('./userRoutes')

router.use('/myAvatars',avatarMiddleware)
router.use('/user',userRoutes)

module.exports = router