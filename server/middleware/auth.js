const { verifyToken } = require('../helpers/jwt')
const Todo = require('../model/todo')
// var mongoose = require('mongoose');

module.exports = {
    authentication: (req, res, next) => {
        try {
            let decodedToken = verifyToken(req.headers.access_token)
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
                        status: 403,
                        msg: 'Not Authorized'
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
    }
}