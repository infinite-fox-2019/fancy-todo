const Todo = require('../models/todo')
const ObjectId = require('mongoose').Types.ObjectId

class TodoController {
    static findAll (req, res, next) {
        Todo.find({
            user_id: ObjectId(req.loggedUser._id)
        }).exec()
        .then(toDos => {
            if (toDos) {
                res.status(200).json(toDos)
            }
            else next({ status: 404, msg: 'To Do List Not Found' })
        })
        .catch(err => next({ msg: err.message }))
    }
    static findOne (req, res, next) {
        const { id } = req.params
        Todo.findOne({ user_id : ObjectId(req.loggedUser._id), _id: id }).exec()
        .then(toDo => {
            if (toDo) {
                res.status(200).json(toDo)
            } else next({ status: 404, msg: 'To Do Not Found' })
        })
        .catch(err => next({ msg: err.message }))
    }
    static create (req, res, next) {
        const { title, description, status } = req.body
        const user_id = ObjectId(req.loggedUser._id)
        Todo.create({ title, description, status, user_id })
        .then(toDo => {
            if (toDo) {
                res.status(200).json(toDo)
            } else {
                next({ status: 401, msg: 'To Do Created Unsuccessful' })
            }
        })
        .catch(err => next({ msg: err.message }))
    }
    static update (req, res, next) {
        const { id } = req.params
        let data = {}
        for (let key in req.body) {
            if (req.body[key]) {
                data[key] = req.body[key]
            }
        }

        Todo.updateOne({ _id : id }, data).exec()
        .then(toDo => {
            if (toDo) res.status(200).json({ msg: 'To Do Successfully Updated' })
            else next({ status: 401, msg: 'To Do Updated Unsuccessful' })
        })
        .catch(err => next({ msg: err.message }))
    }
    static deleteOne (req, res, next) {
        console.log(req.loggedUser)
        const { id } = req.params
        Todo.deleteOne({ _id: id }).exec()
        .then(toDo => {
            if (toDo) res.status(200).json({ msg: 'To Do Successfully Deleted' })
            else next({ status: 401, msg: 'To Do Deleted Unsuccessful' })
        })
        .catch(err => next({ msg: err.message }))
    }
}

module.exports = TodoController