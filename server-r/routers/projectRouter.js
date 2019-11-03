const router = require('express').Router()
const ProjectController = require('../controllers/projectController')
const {authentication, authorizationForProject, authorizationForProjectOwner} = require('../middleware/auth')

router.use(authentication)

router.get('/', ProjectController.projectList) //ok
router.get('/:_id', authorizationForProject, ProjectController.findProject) //ok
router.post('/', ProjectController.createProject) //ok

router.get('/todo/:_id', authorizationForProject, ProjectController.listTodo) //ok
router.post('/todo/:_id', authorizationForProject, ProjectController.addTodo) //ok 
router.patch('/todo/:_id/:TodoId', authorizationForProject, ProjectController.removeTodo) //ok

router.get('/user/:_id', authorizationForProject, ProjectController.listUser) //ok
router.post('/user/:_id', authorizationForProjectOwner, ProjectController.addUser) //ok
router.patch('/user/:_id/:UserId', authorizationForProjectOwner, ProjectController.removeUser) //ok

router.delete('/:_id', authorizationForProjectOwner, ProjectController.deleteProject) //ok

module.exports = router