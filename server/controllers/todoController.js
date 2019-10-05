const Todo = require('../models/todo')

class TodoController {
    static read (req,res,next){
        Todo.find()
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(next)
    }
    static create(req,res,next){
        const {description} = req.body
        Todo.create({description})
        .then(result=>{
            res.status(201).json(result)
        })
        .catch(next)
    }
    static update(req,res,next) {
        const {id} = req.params
        const {description} = req.body
        Todo.updateOne({_id:id},{description})
        .then(result=>{
            res.status(201).json(result)
        })
        .catch(next)
    }
    static delete(req,res,next) {
        let {id} = req.params
        Todo.deleteOne({_id:id})
        .then((result)=>{
            res.status(201).json(result)
        })
        .catch(next)
    }
}

module.exports = TodoController