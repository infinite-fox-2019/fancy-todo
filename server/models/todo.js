const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const TodoSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title Is Required.']
    },
    description: String,
    status: {
        type: Boolean,
        required: [true, 'Status Is Required.']
    },
    user_id: {
        type: ObjectId,
        required: [true, 'User Id Is Required.']
    }
})

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo