const Todo = require('../models/todo')
const Event = require('../models/event')

class TodoController {
    static findTodo(req, res, next) {
        let { eventId } = req.query
        Todo.find({ status: `Todo`, eventId: eventId }).sort({ createdAt: -1 })
            .then(todos => {
                res.status(200).json(todos)
            })
            .catch(next)
    }

    static findDoing(req, res, next) {
        Todo.find({ status: `doing` }).sort({ createdAt: -1 })
            .then(todos => {
                res.status(200).json(todos)
            })
            .catch(next)
    }

    static findDone(req, res, next) {
        Todo.find({ status: `Done` }).sort({ createdAt: -1 })
            .then(todos => {
                res.status(200).json(todos)
            })
            .catch(next)
    }

    static create(req, res, next) {
        const { title, description, eventId, due_date } = req.body
        Todo.create({
            title,
            description,
            due_date: new Date(due_date),
            eventId,
            status: `Todo`
        })
            .then(todo => {
                Event.updateOne({ _id: eventId }, {
                    $post: {
                        todo: todo._id
                    }
                })
                    .then(() => {
                        console.log(`success add todo to event`)
                    })
                    .catch(err => {
                        console.log(err)
                        console.log(`fail add todo to event`)
                    })
                res.status(201).json(todo)
            })
            .catch(next)
    }

    static toDoing(req, res, next) {
        Todo.findByIdAndUpdate({ _id: req.params.id }, {
            status: `doing`
        })
            .then((todo) => {
                res.status(200).json(todo)
            })
            .catch(next)

    }

    static toDone(req, res, next) {
        Todo.findByIdAndUpdate({ _id: req.params.id }, {
            status: `Done`
        })
            .then((todo) => {
                res.status(200).json(todo)
            })
            .catch(next)

    }

    static update(req, res, next) {

    }

    static delete(req, res, next) {

    }
}

module.exports = TodoController