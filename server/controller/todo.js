const Todo = require('../models/todo')
const User = require('../models/user')

class Controller{

    static create(req,res,next){
        console.log('masuk create todo')
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
        console.log('masuk update')
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
        console.log('masuk find todo')
        console.log(req.loggedUser)
        Todo.find({
            userId : req.loggedUser._id
        }).sort('-createdAt')
        .then( todos => {
            console.log(todos)
            res.status(200).json(todos)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static delete(req,res,next){
        console.log('masuk delete')
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