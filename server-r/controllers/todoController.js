const Todo = require('../models/todo')

class TodoController {
  static listTodo(req,res,next){
    const {_id} = req.loggedUser
    Todo.find({UserId:_id})
      .then(data => {
        if(data){
          res.status(200).json(data)
        }
        else{
          res.status(200).json({})
        }
      })
      .catch(next)
  }

  static createTodo(req,res,next){
    const {_id} = req.loggedUser
    const {title,description} = req.body
    Todo.create({UserId:_id,title,description})
      .then(data => {
        res.status(201).json(data)
      })
      .catch(next)
  }
}

module.exports = TodoController