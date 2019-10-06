const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodosSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Descrription is required']
    },
    status: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date,
        required: [true, 'dueDate is required'],
        default: new Date()
    },
    userId: String
})


const Todo = mongoose.model('Todos', TodosSchema)

module.exports = Todo