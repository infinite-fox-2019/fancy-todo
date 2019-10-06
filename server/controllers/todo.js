const Todo = require('../models/todo')

class TodoController {
  static create(req, res, next) {
    const {name, description, status, due_date} = req.body
    Todo
      .create({
        name,
        description,
        status,
        due_date,
        UserId: req.loggedUser.id
      })
      .then(todo => {
        res.status(201).json(todo)
      })
      .catch(next)
  }
  static findAll(req, res, next) {
    Todo
      .find({UserId: req.loggedUser.id})
      .sort({
        createdAt: -1
      })
      .then(todos => {
        if (!todos) {
          next({
            status: 404,
            msg: 'No Data of Todos'
          })
        } else {
          res.status(200).json(todos)
        }
      })
      .catch(next)
  }
  static update(req, res, next) {
    Todo
      .findOneAndUpdate({
        _id: req.params.id
      }, {
        $set: { status: true}
      })
      .then(todo => {
        res.status(201).json(todo)
      })
      .catch(next)
  }
}

module.exports = TodoController