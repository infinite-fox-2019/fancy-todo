const Todos = require('../models/todo')
const getObjUpdate = require('../helpers/objUpdate')

class TodoController{
    static create(req, res, next){
        let { title, description, dueDate } = req.body
        let {id , _id} = req.logedUser
        Todos.create({
            title,
            description,
            dueDate,
            userId : id || _id
        })
            .then(todo => {
                res.status(201).json(todo)
            })
            .catch(next)
    }

    static find(req, res, next){
        let userId = req.logedUser
        Todos.find({ userId }).sort({dueDate: 'asc'})
        .then(todos => {
            res.status(200).json(todos)
        })
        .catch(next)
    }

    static today(req, res, next){
        let userId = req.logedUser
        let date = new Date().toISOString().split('T');
        Todos.find({ userId, dueDate: date[0]}).sort({dueDate: 'asc'})
        .then(todos => {
            res.status(200).json(todos)
        })
        .catch(next)
    }

    static findOne(req, res, next){
        let { id } = req.params
        Todos.findOne({ _id: id })
        .then(todo => {
            res.status(200).json(todo)
        })
        .catch(err => {
            res.status(404).json(err.message)
        })
    }

    static search(req, res, next){
        let { title } = req.params
        Todos.find({ title })
        .then(todos => {
            res.status(200).json(todos)
        })
        .catch(err => {
            res.status(404).json(err.message)
        })
    }
    
    static update(req, res, next){
        let id = req.params.id
        let dataUpdate = getObjUpdate(req.body);
        Todos.updateOne({ _id : id }, { $set: dataUpdate })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static deleted(req, res, next){
        let id = req.params.id
        Todos.deleteOne({ _id: id })
        .then((respon)=> {
            res.status(200).json(respon)
        })
        .catch(err => {
            res.status(404).json(err.message)
        })
    }

}

module.exports = TodoController