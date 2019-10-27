const mongoose = require('mongoose')
const {Schema} = mongoose

const Task = mongoose.model('Task', new Schema({
    name: {
        type: String,
        required: [true, 'Task name cannot be empty'],
        maxlength: [24, 'Task name cannot be longer than 24 characters']
    },
    description: String,
    status: {
        type: Boolean,
        default: false
    },
    startDate: {
        type: Date,
        required: [true, 'Start date cannot be empty']
    },
    dueDate: {
        type: Date,
        required: [true, 'Due date cannot be empty']
    },
    userId: {type: Schema.Types.ObjectId, ref: 'User'}
}))

module.exports = Task