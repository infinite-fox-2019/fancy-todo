const mongoose = require('mongoose');
const Schema = mongoose.Schema

const todoSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, `Title Cannot be Empty`]
    },
    description: {
        type: String
    },
    status: { type: Boolean, default: false },
    date: {
        type: Date,
        default: Date.now
    }
})

const todo = mongoose.model('Todo', todoSchema)
module.exports = todo;