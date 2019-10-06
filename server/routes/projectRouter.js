const express = require('express')
const router = express()
const authentication = require('../middlewares/authentication')
const {authzProject, authzMember} = require('../middlewares/authorization')
const ProjectController = require('../controllers/projectController')
const TodoController = require('../controllers/todoController')

router.use(authentication) //Authentication
router.post('/', ProjectController.create) //untuk create group
router.get('/', ProjectController.getAll)

router.use('/:projectId', authzMember) //Authorization Member of Project

//CRUD Todo By Member & Owner
router.get('/:projectId', ProjectController.projectAndTodos)
router.get('/:projectId/todo/:id', TodoController.getOne)
router.put('/:projectId/todo/:id', TodoController.update)
router.delete('/:projectId/todo/:id', TodoController.destroy)
router.patch('/:projectId/todo/:id', TodoController.changeStatus)

//Exit Group
router.patch('/:projectId/remove', ProjectController.removeMembers) //untuk add people

//Owner Fitur
router.get('/:projectId/user', authzProject,ProjectController.allUsers) //cek user user non-member
router.patch('/:projectId/add', authzProject,ProjectController.addMembers) //untuk add people
router.delete('/:projectId', authzProject, ProjectController.destroy)

module.exports = router