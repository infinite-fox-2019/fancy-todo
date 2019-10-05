
const Todo = require('../models/Todo');

class TodoController {
    static create(req, res, next) {
        const id = req.decode.id
        const { title, description, dueDate } = req.body
        Todo.create({ title, description, owner: id, dueDate })
            .then((Todo) => {
                res.status(201).json(Todo)
            })
            .catch(next);
    };

    static read(req, res, next) {
        const id = req.decode.id
        Todo.find({ owner: id, inProject: null })
            .then((Todos) => {
                res.status(200).json(Todos)
            })
            .catch(next);
    };

    static readOne(req, res, next) {
        const todoId = req.params.todoId
        Todo.findById(todoId)
            .then((Todo) => {
                res.status(200).json(Todo)
            }).catch(next);
    }

    static update(req, res, next) {
        const todoId = req.params.todoId
        const { title, description, dueDate } = req.body
        Todo.findByIdAndUpdate(todoId, { $set: { title, description, dueDate } }, { runValidators: true, new: true })
            .then((Todo) => {
                res.status(200).json(Todo)
            }).catch(next);
    }

    static delete(req, res, next) {
        const todoId = req.params.todoId
        Todo.findByIdAndDelete(todoId)
            .then(() => {
                res.status(200).json(todoId)
            })
            .catch(next);
    };

    static patch(req, res, next) {
        const todoId = req.params.todoId
        Todo.findByIdAndUpdate(todoId, { $set: { status: req.body.status } }, { new: true })
            .then((Todo) => {
                res.status(200).json(Todo)
            }).catch(next);
    }
};

module.exports = TodoController
