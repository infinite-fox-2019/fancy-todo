const Todo = require('../models/todo')

class TodoController {
    static read (req,res,next){
        Todo.find()
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(next)
    }
}

module.exports = TodoController