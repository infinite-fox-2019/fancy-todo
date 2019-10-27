const router = require('express').Router()
const ProjectController = require('../controllers/projectController')
const {authentication} = require('../middleware/auth')

router.use(authentication)
router.get('/:_id', ProjectController.findProject)

module.exports = router