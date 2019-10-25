const ToDo = require('../models/todo')
const Content = require('../models/content')
const ObjectId = require('mongoose').Types.ObjectId


class ToDoController {

    static findAll(req, res, next) {

        const { id } = req.loggedUser
        let userId = ObjectId(id)


        let toDos
        ToDo.find({ userId }).populate(['userId'])
            .then(todos => {
                toDos = todos
                let promises = []

                todos.forEach(todo => {
                    promises.push(Content.find({ todoId: ObjectId(todo._id) }))
                })
                return Promise.all(promises)
            })

        .then(contents => {
            toDos.forEach((toDo, index) => {
                // toDo.list.push(contents[index])

                contents[index].forEach(content => {
                    toDo.list.push(content)
                })
            })
            res.status(200).json(toDos)
        })

        .catch(next)
    }

    static createToDo(req, res, next) {
        const { name } = req.body
        console.log(name);

        let userId = req.loggedUser.id

        console.log(userId, typeof userId);

        ToDo.create({ name, userId })
            .then(todo => {
                res.status(201).json(todo)
            })
            .catch(next)
    }

    static createContent(req, res, next) {
        const { id } = req.body //todoId

        const { name } = req.body

        Content.create({ todoId: id, name })
            .then(todo => {
                res.status(201).json(todo)
            })
            .catch(next)

    }

    static updateContent(req, res, next) {
        const { id, name, status } = req.body

        let updateObj = { name, status: status }


        console.log(updateObj);
        Content.updateOne({ _id: ObjectId(id) }, { $set: updateObj })
            .then(response => {
                res.status(200).json('successfully update item.')
            })
            .catch(next)

    }

    static updateToDo(req, res, next) {

        const { name, todoId } = req.body

        let updateObj = { name }

        ToDo.updateOne({ _id: ObjectId(todoId) }, { $set: updateObj })
            .then(response => {
                // console.log(response);
                res.status(200).json('successfully update To Do list')
            })
    }

    static deleteToDo(req, res, next) {
        const { id } = req.body

        ToDo.remove({ _id: id })
            .then(response => {
                res.status(200).json(response)
            })

        .catch(next)
    }

    static deleteContent(req, res, next) {
        const { id } = req.body

        Content.remove({ _id: id })
            .then(response => {
                res.status(200).json(response)
            })
            .catch(next)
    }


}

module.exports = ToDoController