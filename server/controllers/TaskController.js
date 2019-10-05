const Task = require('../models/Task')

class TaskController {
    static findAll(req, res, next) {
        res.status(200).json({findAll: 'findAll'})
    }

    static create(req, res, next) {
        const {name} = req.body
        Task.create({name, userId: req.loggedUser.id})
        .then(created => {
            res.status(200).json(created)
        })
        .catch(next)
    }
}

module.exports = TaskController