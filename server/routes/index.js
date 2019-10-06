const router = require('express').Router()
const users = require('./userRouter')
const todos = require('./todoRouter')
const projects = require('./projectRouter')
const apis = require('./apiRouter')

router.use('/users', users)
router.use('/apis', apis)
router.use('/todos', todos)
router.use('/projects', projects)

module.exports = router