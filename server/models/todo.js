const mongoose = require('mongoose')
const Schema = mongoose.Schema

let todoSchema = new Schema ({
    name: {
        type: String,
        required: true
    },

    author: {
        type: String,
    },

    createdAt: Date
})

let Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo