'use strict'

const { Todo } = require('../models')

module.exports = (req, res, next) => {
  Todo.findOne({ _id: req.params.id, UserId: req.decode.id })
    .then((todo) => {
      if (todo) {
        if (String(todo.UserId) === String(req.decode.id)) {
          next()
        } else {
          next({ status: 401, message: 'Unauthorized process!' })
        }
      } else {
        next({ status: 404, message: 'Todo is not found' })
      }
    }).catch(next)
}
