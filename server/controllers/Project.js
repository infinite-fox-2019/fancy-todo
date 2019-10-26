const Project = require('../models/Project'),
    Todo = require('../models/Todo'),
    mongoose = require('mongoose')

class ProjectController {
    static create(req, res, next) {
        const id = req.decode.id
        const { name } = req.body
        Project.create({ name, owner: id })
            .then((project) => {
                res.status(201).json(project)
            })
            .catch(next);
    };

    static read(req, res, next) {
        const id = req.decode.id
        Project.find({ members: mongoose.Types.ObjectId(id) })
            .sort({ updatedAt: -1 })
            .populate('owner', '-password')
            .then((projects) => {
                res.status(200).json(projects)
            }).catch(next);
    }

    static readOne(req, res, next) {
        const projectId = req.params.projectId
        Project.findById(projectId)
            .populate({ path: 'todos', populate: { path: 'owner', select: '-password' } })
            .populate('members', '-password')
            .then((project) => {
                res.status(200).json(project)
            })
            .catch(next);
    };

    static patch(req, res, next) {
        const projectId = req.params.projectId
        console.log(projectId);
        const { name } = req.body
        Project.findByIdAndUpdate(projectId, { $set: { name } }, { runValidators: true, new: true })
            .then((project) => {
                res.status(200).json(project)
            }).catch(next);
    }

    static delete(req, res, next) {
        const projectId = req.params.projectId
        Project.findById(projectId)
            .then((result) => {
                if (result) return Todo.deleteMany({ _id: { $in: result.todos } })
                else {
                    let err = new Error('Project Not Found')
                    err.status = 404
                    throw err
                }
            })
            .then(() => {
                return Project.findByIdAndDelete(projectId)
            })
            .then(() => { res.status(200).json("Project Deleted") })
            .catch(next)
    };

    static join(req, res, next) {
        const inviteLink = req.body.inviteLink
        const userId = req.decode.id
        let projectId
        Project.findOne({ inviteLink })
            .then((project) => {
                projectId = project._id
                if (project) {
                    if (project.members.includes(userId)) {
                        let err = new Error('You have already joined this project')
                        err.status = 400
                        throw err
                    } else {
                        return Project.findByIdAndUpdate(projectId, { $push: { members: userId } }, { new: true })
                            .populate('todos')
                            .populate('members', '-password')
                    }
                } else {
                    let err = new Error("Project not found")
                    err.status = 404
                    throw err
                }
            })
            .then((project) => {
                res.status(200).json(project)
            })
            .catch(next);
    }
    static leave(req, res, next) {
        const projectId = req.params.projectId
        const userId = req.decode.id
        Project.findById(projectId)
            .then((result) => {
                if (result) {
                    if (result.owner === result.members[0]) {
                        let err = new Error('Project owner cannot leave Project')
                        err.status = 400
                        throw err
                    } else {
                        return Project.findByIdAndUpdate(projectId, { $pull: { members: userId } }, { new: true })
                            .populate('Todos')
                            .populate('members', '-password')
                    }
                } else {
                    let err = new Error('Project Not Found')
                    err.status = 404
                    throw err
                }
            })
            .then((project) => res.status(200).json(project))
            .catch(next);
    }

    static addTodo(req, res, next) {
        const projectId = req.params.projectId
        const userId = req.decode.id
        const { title, description, dueDate } = req.body
        Todo.create({ title, description, dueDate, owner: userId, inProject: projectId })
            .then((Todo) => {
                return Project.findByIdAndUpdate(projectId, { $push: { todos: Todo.id } }, { new: true })
                    .populate('Todos')
                    .populate('members', '-password')
            })
            .then((project) => res.status(201).json(project))
            .catch(next);
    }

    static removeTodo(req, res, next) {
        const { projectId, todoId } = req.params
        let data
        Project.findByIdAndUpdate(projectId, { $pull: { todos: todoId } }, { new: true })
            .populate('Todos')
            .populate('members', '-password')
            .then((Project) => {
                data = Project
                return Todo.findByIdAndDelete(todoId)
            })
            .then(() => res.status(200).json(data))
            .catch(next)
    }
};

module.exports = ProjectController
