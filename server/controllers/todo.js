'use strict'

const { Todo } = require('../models')

class TodoController {
  static create (req, res, next) {
    Todo.create({
      title: req.body.title,
      description: req.body.description,
      status: false,
      dueDate: req.body.dueDate,
      urgency: false,
      UserId: req.decoded.id
    })
      .then((todo) => {
        res.status(201).json(todo)
      }).catch(next)
  }

  static getAll (req, res, next) {
    console.log('Successfully read all todos')
    Todo.find({ UserId: req.decoded.id, status: req.query.status }).populate('UserId')
      .then(todos => {
        console.log(todos)
        res.status(200).json(todos)
      })
      .catch(next)
  }

  static remove (req, res, next) {
    Todo.findByIdAndDelete({
      _id: req.params.id
    })
      .then(result => {
        res.status(200).json({ message: 'Todo successfully deleted', result })
      })
      .catch(next)
  }

  static edit (req, res, next) {
    const id = req.params.id
    const input = req.body
    const update = {}
    for (const keys in input) {
      update[keys] = req.body[keys]
    }
    Todo.findByIdAndUpdate(id,
      { $set: update },
      { new: true })
      .then((result) => {
        res.status(201).json(result)
      })
      .catch(next)
  }
}

module.exports = TodoController
