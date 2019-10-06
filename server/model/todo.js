const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const TodoSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    status: {
        type: String,
        required: [true, 'Status is required']
    },
    dueDate: {
        type: Date
    },
    UserId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    projectId: [{
        type: ObjectId,
        ref: 'Project'
    }]
}, { timestamps: true })

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;