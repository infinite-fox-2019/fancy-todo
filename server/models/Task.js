const mongoose = require('mongoose')
const {Schema} = mongoose

const Task = mongoose.model('Task', new Schema({
    name: String,
    description: String,
    status: String,
    startDate: Date,
    dueDate: Date,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
}))

module.exports = Task