const mongoose = require('mongoose')

const Schema = mongoose.Schema

const contentSchema = new Schema({
    name: { type: String, required: true },
    status: { type: Boolean, default: false },
    todoId: { type: Schema.Types.ObjectId, ref: 'ToDo' }
})

const Content = mongoose.model('Content', contentSchema)

module.exports = Content;