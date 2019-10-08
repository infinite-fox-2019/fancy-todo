const Todo = require('../models/todo')
const axiosEvent = require('../config/axios')

class TodoController {

  static findEvent( req, res, next ){
    const address = req.body.address
     console.log(req.body)
    axiosEvent({
      method: 'get',
      url: `?location.address=${address}&start_date.keyword=this_week`
    })
      .then(response => {
        console.log(response.data)
        res.status(200).json(response.data)
      })
      .catch(next)
  }

  static findAll( req, res, next ){
    Todo.find({userId:req.user.id})
      .then(data => {
        res.status(200).json({ data })
      })
      .catch(next)
  }

  static create( req, res, next ){
    const userId = req.user.id
    const { name, description, dueDate, event } = req.body
    
    Todo.create({ userId , name, description, dueDate, event, status: false })
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
