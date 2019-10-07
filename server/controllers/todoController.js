const Todo = require('../models/todo')

class TodoController {
  static create(req, res, next) {
    const user = req.decoded._id
    const { name, description, dueDate, project } = req.body
    Todo.create({
      name,
      description,
      dueDate,
      user,
      project
    })
      .then(newTodo => {
        res.status(201).json({
          message: 'Success create new todo',
          newTodo
        })
      })
      .catch(next)
  }
  static getAll(req, res, next) {
    Todo.find({
      user: req.decoded._id,
      project: null
    })
      .sort({ 'dueDate': 1 }).exec()
      .then(todos => {
        if (todos) {
          res.status(200).json({
            message: 'Here is your todo :',
            todos
          })
        }
        else {
          res.status(200).json({
            message: `There's no todo`
          })
        }
      })
      .catch(next)
  }
  static getOne(req, res, next) {
    Todo.findById(req.params.id)
      .then(result => {
        res.status(200).json({
          message: `Here's your todo`,
          todo: result
        })
      })
      .catch(next)
  }
  static destroy(req, res, next) {
    Todo.deleteOne({ _id: req.params.id })
      .then(deleted => {
        res.status(200).json({
          message: `Success deleted`
        })
      })
      .catch(next)
  }
  static update(req, res, next) {
    const {name, description , dueDate, status} = req.body
    Todo.updateOne({
      _id: req.params.id
    }, {
      name, description, dueDate, status
    })
      .then(changed => {
        res.status(200).json({
          message: 'Success updated'
        })
      })
      .catch(next)
  }
  static changeStatus(req, res, next){
    const {status} = req.body
    Todo.updateOne({
      _id: req.params.id
    }, {
      status
    })
      .then(changed => {
        res.status(200).json({
          message: 'Success change status to '+status
        })
      })
      .catch(next)
  }
}

module.exports = TodoController