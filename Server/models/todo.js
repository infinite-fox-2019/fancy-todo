const mongoose = require('mongoose')

const Schema = mongoose.Schema

const todoSchema = new Schema({ 
    name: String,
    description: String,
    due: Date,
    tags: [String],
    status: Boolean,
    UserId: { type: Schema.Types.ObjectId, ref: 'User' }
});

var Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo