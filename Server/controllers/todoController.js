const Todo = require('../models/todo')
const mongoose = require('mongoose')
const User = require('../models/user')
const {OAuth2Client} = require('google-auth-library');
const googleCalendarAPI = require('../apis/googleCalendar')


const client = new OAuth2Client('1064661640914-1aefku5io65dqkgj9tm0u0dmjumidkvk.apps.googleusercontent.com');

class TodoController{
    static googleCalendar(req, res, next){
        const idToken = req.body.token    
        client.verifyIdToken({
            idToken,
            audience: '1064661640914-1aefku5io65dqkgj9tm0u0dmjumidkvk.apps.googleusercontent.com'
        })
            .then(ticket=>{
                const payload = ticket.getPayload()
                const {email} = payload
                return User.findOne({email})
            })
            .then(user=>{
                const email = user.email
                return googleCalendarAPI.post(`/primary/events`)
            })
            .then(({data})=>{
                res.status(200).json(data)
            })
            .catch(next)
    }

    static getAll(req, res, next){
        Todo.find()
            .then(todos=>{
                res.send(todos)
            })
            .catch(next)
    }

    static getWithToken(req, res, next){
        const idToken = req.body.token
        
        client.verifyIdToken({
            idToken,
            audience: '1064661640914-1aefku5io65dqkgj9tm0u0dmjumidkvk.apps.googleusercontent.com'
        })
            .then(ticket=>{
                const payload = ticket.getPayload()
                const {email} = payload
                return User.findOne({email})
            })
            .then(user=>{
                const UserId = user._id
                return Todo.find({UserId})
            })
            .then(todos=>{
                res.send(todos)
            })
            .catch(next)
    }

    static getDone(req, res, next){
        Todo.find({status: true})
            .then(todos=>{
                res.send(todos)
            })
            .catch(next)
    }

    static getUndone(req, res, next){
        Todo.find({status: false})
            .then(todos=>{
                res.send(todos)
            })
            .catch(next)
    }

    static findTodo(req, res, next){
        const search = req.query.q
        const idToken = req.body.token

        client.verifyIdToken({
            idToken,
            audience: '1064661640914-1aefku5io65dqkgj9tm0u0dmjumidkvk.apps.googleusercontent.com'
        })
            .then(ticket=>{
                const payload = ticket.getPayload()
                const {email} = payload
                return User.findOne({email})
            })
            .then(user=>{
                const UserId = user._id
                return Todo.find({description: {$regex: search}, UserId})
            })
            .then(todos=>{
                res.send(todos)
            })
            .catch(next)
    }

    static addTodo(req, res, next){
        const {description, due} = req.body
        const idToken = req.body.token
        client.verifyIdToken({
            idToken,
            audience: '1064661640914-1aefku5io65dqkgj9tm0u0dmjumidkvk.apps.googleusercontent.com'
        })
            .then(ticket=>{
                
                const payload = ticket.getPayload()
                const {email} = payload
                return User.findOne({email})
            })
            .then(user=>{
                const UserId = user._id
                return Todo.create({
                    description,
                    due,
                    status:false,
                    UserId
                })  
            })
            .then(todo=>{
                res.send(todo)
            })
            .catch(next)
    }

    static todoDone(req, res, next){
        const _id = mongoose.Types.ObjectId(req.params.id)
        Todo.updateOne({_id}, {status: true})
            .then(number=>{
                res.send(number)
            })
            .catch(next)
    }

    static todoUndone(req, res, next){
        const _id = mongoose.Types.ObjectId(req.params.id)
        Todo.updateOne({_id}, {status: false})
            .then(number=>{
                res.send(number)
            })
            .catch(next)
    }

    static changeDescription(req, res, next){
        const {description} = req.body
        const _id = mongoose.Types.ObjectId(req.params.id)
        Todo.updateOne({_id}, {description})
            .then(todo=>{
                res.send(todo)
            })
                .catch(next)
    }

    static deleteOne(req, res, next){
        const _id = mongoose.Types.ObjectId(req.params.id)
        Todo.deleteOne({_id})    
            .then(number=>{
                res.send(number)
            })    
            .catch(next)
    }

    static deleteDone(req, res, next){

        const idToken = req.body.token
        
        client.verifyIdToken({
            idToken,
            audience: '1064661640914-1aefku5io65dqkgj9tm0u0dmjumidkvk.apps.googleusercontent.com'
        })
            .then(ticket=>{
                const payload = ticket.getPayload()
                const {email} = payload
                return User.findOne({email})
            })
            .then(user=>{
                const UserId = user._id
                return Todo.deleteMany({status: true, UserId})
            })
            .then(number=>{
                res.send(number)
            })
                .catch(next)
    }
}

module.exports = TodoController