const mongoose = require('mongoose')

const Schema = mongoose.Schema

let todoSchema = new Schema({
    description : {type:String,required:true},
    status : { type: Boolean, default: false} ,
    dueDate : Date,
    point : { type: Number, default: 0}   
})

let Todo = mongoose.model('Todo',todoSchema)

module.exports = Todo