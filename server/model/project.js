const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    dueDate: {
        type: Date
    },
    todoList: [{
        type: ObjectId,
        ref: 'Todo'
    }],
    member: [{
        type: ObjectId,
        ref: 'User'
    }]
})

const Project = mongoose.model('Todo', ProjectSchema);

module.exports = Todo;