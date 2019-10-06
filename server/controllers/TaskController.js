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
        .then(_ => {
            res.status(200).json({message: 'task created successfully'})
        })
        .catch(next)
    }

    static update(req, res, next) {
        const {name, description, startDate, dueDate, status} = req.body
        if(!name || !startDate || !dueDate) {
            throw {status: 400, title: 'Invalid Input', msg: 'Please fill the form'}
        }
        console.log(req.params.id, name)
        let opts = {omitUndefined: true, useFindAndModify: true}
        Task.findByIdAndUpdate(req.params.id,
            {$set: {name, description, startDate, dueDate, status}}, opts
        )
        .then(updated => {
            // console.log(updated)
            res.status(200).json({message: 'task updated successfully'})
        })
        .catch(next)
    }

    static delete(req, res, next) {
        let opts = {omitUndefined: true, useFindAndModify: true}
        Task.findByIdAndDelete(req.params.id, opts) 
        .then(deleted => {
            console.log(deleted)
            res.status(200).json({message: 'task updated successfully'})
        })
        .catch(next)
    }
}

module.exports = TaskController