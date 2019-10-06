const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    due_date: Date,
    status: {
        type: String,
        required: true
    },
    eventId: {
        type: Schema.Types.ObjectId,
        ref: `Event`
    }
}, {
    timestamps: true
})

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo