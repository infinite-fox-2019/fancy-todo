const Todo = require('../models/todo')
const User = require('../models/user')

class Controller{

    static create(req,res,next){
        Todo.create({
            activity: req.body.activity,
            description: req.body.description,
            due_date: req.body.due_date,
            userId: req.loggedUser._id
        })
        .then( created => {
            return User.updateOne({ _id : req.loggedUser._id} , { $push: { todo : created._id } })
        })
        .then( dataUpdate => {
            res.status(201).json({msg: `success added list to ${req.loggedUser.name}`})
        })
        .catch(next)
    }

    static update(req,res,next){
        let allowedFields = ['activity', 'description', 'status']
        let update ={}
        for(let key in req.body){
            allowedFields.forEach(field => {
                if(key === field)update[key] = req.body[key]
            });
        }
        Todo.updateOne({
            _id : req.body._id
        }, update )
        .then( updateData => {
            res.status(201).json(updateData)
        })
        .catch(next)
    }

    static find(req,res,next){
        Todo.find({
            userId : req.loggedUser._id
        }).sort('-createdAt')
        .then( todos => {
            res.status(200).json(todos)
        })
        .catch(next)
    }

    static delete(req,res,next){
        Todo.deleteOne({
            _id : req.body._id
        })
        .then( response => {
            res.status(200).json({response, msg:'success deleting task'})
        })
        .catch(next)
    }
    
}

module.exports = Controller