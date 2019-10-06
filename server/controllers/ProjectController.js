const Project = require('../model/project')

class ProjectController {

    static create(req, res, next) {
        let UserId = req.decode.id
        const { title, description, status, dueDate } = req.body
        Todo.create({ title, description, dueDate, status, UserId })
            .then(todo => {
                res.status(200).json(todo)
            })
            .catch(next)
    }

    static find(req, res, next) {
        let UserId = req.decode.id
        Todo.find({ UserId })
            .then(todos => {
                res.status(200).json(todos)
            })
            .catch(next)
    }

    static findById(req, res, next) {
        let { id } = req.params
        Todo.findById(id)
            .then(todo => {
                res.status(200).json(todo)
            })
            .catch(next)

    }

    static updatePatch(req, res, next) {
        const { title, description, status, dueDate } = req.body
        let id = req.params.id
        Todo.findById(id)
            .then(todo => {
                if (title) todo.title = title
                if (description) todo.description = description
                if (status) todo.status = status
                if (dueDate) todo.dueDate = new Date(dueDate)
                return todo.save()
            })
            .then(updatedTodo => {
                res.status(200).json(updatedTodo)
            })
            .catch(next)
    }

    static deleteOne(req, res, next) {
        let id = req.params.id
        Todo.deleteOne({ _id: id })
            .then(todo => {
                res.status(200).json(todo)
            })
            .catch(next)
    }

}

module.exports = ProjectController
