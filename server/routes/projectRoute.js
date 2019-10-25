const router = require('express').Router()
const ProjectController = require('../controllers/ProjectController')
const { authentication, authorizationProject } = require('../middleware/auth')

router.get('/', authentication, ProjectController.find)
router.post('/', authentication, ProjectController.create)
router.get('/:id', authentication, authorizationProject, ProjectController.findById)
router.delete('/:id', authentication, authorizationProject, ProjectController.deleteOne)
router.patch('/:id', authentication, authorizationProject, ProjectController.updatePatch)



module.exports = router