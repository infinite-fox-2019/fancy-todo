'use strict'

const express = require('express')
const { ProjectController } = require('../controllers')
const authProjectMember = require('../middlewares/authProjectMember')
const authProjectOwner = require('../middlewares/authProjectOwner')
const router = express.Router()

router.post('/', ProjectController.createProject)
router.get('/', ProjectController.getAllProject)
router.get('/:id', ProjectController.getOneProject)
router.delete('/:id', ProjectController.deleteProject)

router.patch('/members/:id', ProjectController.addMembers)
router.patch('/add-todo/:id', ProjectController.addTodo)
router.patch('/exitProject/:id', ProjectController.exitProject)
router.get('/all-users', ProjectController.allUsers)
router.get('/all-todos', ProjectController.allTodos)
