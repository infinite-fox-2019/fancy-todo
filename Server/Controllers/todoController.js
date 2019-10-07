const Todo = require('../Models/todo');
const User = require('../Models/user');
const { ObjectId } = require('mongoose').Types;
class TodoController {

    static createTodo(req, res) {
            console.log(req.body)
            const { title, description } = req.body
            const owner = req.decoded.id
            const NewTodo = {
                owner: owner,
                title: title,
                description: description
            }
            Todo.create(NewTodo)
                .then(function(todo) {
                    res.status(201).json(todo)
                })
                .catch(function(err) {
                    res.status(500).json({
                        message: err.message
                    })
                })
        } //

    static findUserTodo(req, res) {
            Todo.find({ owner: req.decoded.id })
                .then(function(todos) {

                    let todoDatas = [];
                    let status = true;
                    todos.forEach(function(todo) {
                        todoDatas.push(todo)
                    })
                    res.status(200).json(todoDatas)
                })
                .catch(function(err) {
                    res.status(500).json({
                        message: err.message
                    })
                })
        } //

    static deleteTodo(req, res) {
            Todo.deleteOne({
                    _id: ObjectId(req.params.id),
                    owner: req.decoded.id
                })
                .then(function(deleteTodo) {
                    res.status(201).json(deleteTodo)
                })
                .catch(function(err) {
                    res.status(500).json({
                        message: err.message
                    })
                })
        } //

    static updateTodo(req, res) {
            const newUpdate = {
                title: req.body.title,
                description: req.body.description,

            }
            Todo.updateOne({
                    owner: req.decoded.id,
                    _id: ObjectId(req.params.id)
                }, { $set: newUpdate })
                .then(function(todoUpdate) {
                    res.status(201).json(todoUpdate)
                })
                .catch(function(err) {
                    res.status(500).json({
                        message: err.message
                    })
                })

        } //

    static updateStatus(req, res) {
        Todo.updateOne({
                owner: req.decoded.id,
                _id: ObjectId(req.params.id)
            }, { $set: { status: req.body.status } })
            .then(function(update) {
                res.status(201).json(update)
            })
            .catch(function(err) {
                res.status(500).json({
                    message: err.message
                })
            })
    }



} //


module.exports = TodoController