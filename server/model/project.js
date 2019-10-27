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
    status: {
        type: String,
        required: [true, 'Status is required'],
        default: 'UNCOMPLETE'
    },
    todoList: [{
        type: ObjectId,
        ref: 'Todo'
    }],
    member: [{
        type: ObjectId,
        ref: 'User'
    }],
    UserId: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
})

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;