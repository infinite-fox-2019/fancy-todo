const Todo = require('../models/todo')

class TodoController {
    static findAll(req, res) {
        const user = {
            author: req.LoggedUser.name
        }
        
        Todo.find(user)
            .then(todos_data => {
                res.status(200).json(todos_data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static findOneById(req, res) {
        const id = req.query.id
            Todo.findById(id)
            .then(todo_data => {
                res.status(200).json(todo_data)
            })
            .catch(err => {
                res.status(500).json(err)
            })

    }

    static create(req, res) {
        const createdData = {
            name: req.body.name,
            author: req.body.author,
            createdAt: new Date()
        }

        Todo.create(createdData)
            .then(created_data => {
                res.status(201).json(created_data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static update(req, res) {
        const updatedData = {
            name: req.body.name,
            author: req.body.author
        }

        const id = {
            _id: req.params.id
        }

        Todo.findByIdAndUpdate(id, updatedData)
            .then(updated_data => {
                res.status(200).json(updated_data)
            })
            .catch(err => {
                res.status(500).json(err)
            })

    }

    static delete(req, res) {
        const id = {
            _id: req.params.id
        }

        Todo.findByIdAndDelete(id)
            .then(deleted_data => {
                res.status(200).json(deleted_data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = TodoController