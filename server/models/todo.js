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

    createdAt: Date,

    user: [{
        type: Schema.Types.ObjectId,
        ref:'User'
    }]
})

let Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo