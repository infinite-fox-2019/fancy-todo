const Todo = require('../models/todo')
const User = require('../models/user')

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
                // console.log(req.LoggedUser)
                // console.log(created_data)
                User.findByIdAndUpdate(req.LoggedUser.id, {
                    $push: {
                        todoList: created_data._id
                    }
                })
                .then(result => {
                    res.status(201).json({
                        message: 'Successfully created task'
                    })
                })
                .catch(err => {
                    res.status(500).json(err)
                })
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
                res.status(200).json({
                    message: 'Successfully updated task'
                })
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
                User.findByIdAndUpdate(req.LoggedUser.id, {
                    $pull: {
                        todoList: req.params.id
                    }
                })
                .then(result => {
                    res.status(200).json({
                        message: 'Successfully deleted task'
                    })
                })
                .catch(err => {
                    res.status(500).json(err)
                })
                
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = TodoController