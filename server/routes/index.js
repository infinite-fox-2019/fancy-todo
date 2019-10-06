const router = require('express').Router()
const todos = require('./todo')
const user = require('./user')


router.use('/user', user)
router.use('/todo', todos)


module.exports = router