const Todo = require('../models/todo')

class TodoController {
  static create(req, res, next) {
    const { todo, description, due_date, tags } = req.body
    const userId = req.loggedUser._id

    let date = due_date < new Date() ? new Date() : due_date

    Todo
      .create({
        todo,
        description,
        due_date: date,
        tags,
        userId
      })
      .then(todo => {
        res.status(201).json(todo)
      })
      .catch(next)
  }

  static getTodos(req, res, next) {
    const userId = req.loggedUser._id
    console.log('galo')
    Todo
      .find({
        userId
      })
      .sort({ createdAt: 'desc' })
      .then(todos => {
        res.status(200).json(todos)
      })
      .catch(next)
  }

  static update(req, res, next) {
    const { todo, description, tags, status } = req.body
    const { id } = req.params

    Todo
      .findOneAndUpdate({ _id: id }, {
        todo,
        description,
        tags,
        status
      })
      .then(todo => {
        // console.log(todo)
        res.status(200).json(todo)
      })
      .catch(next)
  }

  static delete(req, res, next) {
    const _id = req.params.id

    Todo
      .deleteOne({ _id })
      .then(_ => {
        res.status(200).json({ message: 'Todo Deleted' })
      })
      .catch(next)
  }
}

module.exports = TodoController