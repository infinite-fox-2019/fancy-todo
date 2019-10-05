const Todo = require('../models/Todo')

module.exports = (req, res, next) => {
    const todoId = req.params.todoId
    const userId = req.decode.id
    Todo.findById(todoId)
        .then((Todo) => {
            if (Todo) {
                if (Todo.owner == userId) {
                    next()
                } else {
                    let err = new Error('You have no authorization on this Todo')
                    err.name = 'AuthorizationError'
                    next(err)
                }
            } else {
                let err = new Error('Todo does not exist')
                err.name = 'NotFound'
                next(err)
            }
        }).catch(next);
}