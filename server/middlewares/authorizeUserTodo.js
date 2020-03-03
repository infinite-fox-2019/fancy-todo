const Todo = require('../models/todo')

module.exports = (req, res, next) => {
  
  Todo
    .findOne({ _id: req.params.id })
    .then(todo => {
      if(req.loggedUser._id == todo.userId) next()
      else next({status: 401, message:"User not authorized to do this action"})
    })
    .catch(next)
}