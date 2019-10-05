const Task = require('../models/Task')

class TaskController {
    static findAll(req, res, next) {
        Task.find({userId: req.loggedUser.id})
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch(next)
    }

    static findNow(req, res, next) {
        Task.find({
            userId: req.loggedUser.id,
            startDate: {$lte: new Date()},
            status: false
        })
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch(next)
    }

    static create(req, res, next) {
        const {name, startDate, dueDate} = req.body
        Task.create({name, startDate, dueDate, userId: req.loggedUser.id})
        .then(created => {
            res.status(200).json(created)
        })
        .catch(next)
    }
}

module.exports = TaskController