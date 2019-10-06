const Todo = require('../models/todo')

class TodoController {

  static findAll( req, res, next ){
    Todo.find()
      .then(data => {
        res.status(200).json({ data })
      })
      .catch(next)
  }

  static create( req, res, next ){
    const userId = req.user.id
    const { name, description, dueDate } = req.body
    Todo.create({ userId , name, description, dueDate, status:false })
      .then( todo => {
        res.status(201).json(todo)
      })
      .catch (next)
  }

  static update( req, res, next ){
    const fields = ['name', 'description', 'dueDate', 'status']
    let update = {}
    for (let key in req.body){
      fields.forEach(data => {
        if (key == data){ update[key] = req.body[key] }
      });
    }
    Todo.findByIdAndUpdate({ _id: req.params.id}, update)
    .then( todoUpdate => {
      res.status(200).json(todoUpdate)
    })
    .catch(next)
  }

  static delete( req, res, next ){
    Todo.findOneAndRemove({ _id: req.params.id})
    .then( todoDelete => {
      res.status(200).json(todoDelete)
    })
    .catch(next)
  }
}

module.exports = TodoController
