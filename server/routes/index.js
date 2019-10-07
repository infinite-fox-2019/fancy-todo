// const express = require('express')
// const app = express()
const router = require('express').Router()
const avatarMiddleware = require('adorable-avatars')
// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })
const userRoutes = require('./userRoutes')

router.use('/myAvatars',avatarMiddleware)
// app.post('/img', upload.single('img'), function (req, res, next) {
//     let dataForm = {}
//     if (req.query.tag) {
//         dataForm = {
//             tag: req.body.tag
//         }
//     } else if (req.query.description) {
//         dataForm = {
//             description: req.body.description
//         }
//     } else {
//         dataForm = {
//             avatar: req
//                 .file
//                 .buffer
//                 .toString('base64')
//         }
//     }
//     res.status(200).json(dataForm)
// })
router.use('/user',userRoutes)

module.exports = router