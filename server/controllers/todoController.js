const Todo = require("../models/todo")
const User = require("../models/user")
const ObjectID = require('mongoose').Types.ObjectId

class TodoController{
    static allTodo(req, res, next){
         User.findOne({email : req.loggedUser.email})
         .then(function(data){
             return Todo.find({_id:data.todoList})
         })
         .then(function(data){
             res.status(200).json(data)
         })
         .catch(next)
    }
    static addTodo(req, res, next){
        const{name, description, dueDate} = req.body
        console.log(req.loggedUser);
        console.log(req.body);
        // console.log({name, description, dueDate})
        Todo.create({name, description, dueDate})
        .then(function(data){
            // console.log(data)
            return User.updateOne({email:req.loggedUser.email},{$push: { todoList: data }})
        })
        .then(function(data){
            res.status(201).json(data)
        })
        .catch(next)
    }
    static deleteTodo(req, res, next){
        const{_id} = req.body
        Todo.deleteOne({_id})
        .then(function(){
            console.log(ObjectID(_id))
            return User.update({email:req.loggedUser.email}, {$pullAll: { todoList: [ObjectID(_id)] }}, { safe: true, multi:true })
        })
        .then(function(data){
            res.status(200).json(data)
        })
        .catch(next)
    }
    static updateTodo(req, res, next){
        const{_id,name, description, dueDate} = req.body
        Todo.findOneAndUpdate({_id}, {name, description, dueDate},{runValidators: true,  new: true })
        .then(function(data){
            res.status(200).json(data)
        })
        .catch(next)
        
    }

    // static updateTodo(req, res, next){
    //     const{_id} = req.body
    //     const {name, description, status, dueDate} = req.body
    //     let obj = {}
    //     if(name) obj.name = name
    //     if(description) obj.description = description
    //     if(status) obj.status = status
    //     if(dueDate) obj.dueDate = dueDate
    //     Todo.updateOne({_id}, obj,{ new: true })
    //     .then(function(data){
    //         res.status(200).json(data)
    //     })
    //     .catch(next)
        
    // }

    static statusTodo(req, res, next){
        const{_id, status} = req.body
        Todo.updateOne({_id}, {status})
        .then(function(data){
            res.status(200).json(data)
        })
        .catch(next)
    }
}

module.exports = TodoController