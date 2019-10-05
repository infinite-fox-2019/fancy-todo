const Router = require('express').Router(),
    ProjectController = require('../controllers/Project'),
    authentication = require('../middleware/authentication'),
    authorizationProject = require('../middleware/authorizationProject'),
    authorizationMember = require('../middleware/authorizationMember')

Router.use(authentication)
Router.post('/', ProjectController.create)
Router.get('/', ProjectController.read)
Router.get('/join/:projectId', ProjectController.join)


// ! Members Exclusive
// * Project Owner Only

Router.patch('/update/:projectId/', authorizationMember, authorizationProject, ProjectController.patch)
Router.delete('/delete/:projectId/', authorizationMember, authorizationProject, ProjectController.delete)
Router.delete('/project/:projectId/:todoId', authorizationMember, authorizationProject, ProjectController.removeTodo)


// * All members

Router.get('/leave/:projectId/', authorizationMember, ProjectController.leave)
Router.get('/project/:projectId', authorizationMember, ProjectController.readOne)
Router.post('/project/:projectId', authorizationMember, ProjectController.addTodo)


module.exports = Router;
