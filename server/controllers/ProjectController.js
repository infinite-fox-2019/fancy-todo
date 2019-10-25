const Project = require('../model/project')

class ProjectController {

    static create(req, res, next) {
        let UserId = req.decode.id
        const { title, description, dueDate, status, todoList, member } = req.body
        Project.create({  title, description, dueDate, status, todoList, member, UserId })
            .then(project => {
                res.status(200).json(project)
            })
            .catch(next)
    }

    static find(req, res, next) {
        let UserId = req.decode.id
        Project.find({ UserId })
            .then(projects => {
                res.status(200).json(projects)
            })
            .catch(next)
    }

    static findById(req, res, next) {
        let { id } = req.params
        Project.findById(id)
            .then(project => {
                res.status(200).json(project)
            })
            .catch(next)

    }

    static updatePatch(req, res, next) {
        const { title, description, dueDate, status, todoList, member } = req.body
        let id = req.params.id
        Project.findById(id)
            .then(project => {
                if (title) project.title = title
                if (description) project.description = description
                if (status) project.status = status
                if (dueDate) project.dueDate = new Date(dueDate)
                if (todoList) project.todoList = todoList
                if (member) project.member = member
                return project.save()
            })
            .then(project => {
                res.status(200).json(project)
            })
            .catch(next)
    }

    static deleteOne(req, res, next) {
        let id = req.params.id
        Project.deleteOne({ _id: id })
            .then(project => {
                res.status(200).json(project)
            })
            .catch(next)
    }

}

module.exports = ProjectController
