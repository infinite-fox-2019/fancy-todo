const { verifyToken } = require('../helpers/jwt')
const Todo = require('../model/todo')
const Project = require('../model/project')

module.exports = {
    authentication: (req, res, next) => {
        try {
            let decodedToken = verifyToken(req.headers.token)
            req.decode = decodedToken
            next()
        }
        catch (err) {
            next(err)
        }
    },

    authorization: (req, res, next) => {
        let todoId = req.params.id
        let userId = req.decode.id

        Todo.findById(todoId)
            .then(todo => {
                if (!todo) {
                    next({
                        status: 404,
                        msg: 'Todo is Not Found'
                    })
                }
                else if (todo.UserId != userId) {
                    next({
                        status: 403,
                        msg: 'Not Authorized'
                    })
                }
                else {
                    next()
                }
            })
            .catch(next)
    },

    authorizationProject: (req, res, next) => {
        let projectId = req.params.id
        let userId = req.decode.id

        Project.findById(projectId)
            .then(project => {
                if (!project) {
                    next({
                        status: 404,
                        msg: 'Project is Not Found'
                    })
                }
                else if (project.UserId != userId) {
                    next({
                        status: 403,
                        msg: 'Not Authorized'
                    })
                }
                else {
                    next()
                }
            })
            .catch(next)
    }
}