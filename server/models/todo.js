const mongoose = require('mongoose')

let Schema = mongoose.Schema

let todoSchema = new Schema({
    challenge : String,
    expired : Date
})

let Todo = mongoose.model('Todo',todoSchema)

module.exports = Todo