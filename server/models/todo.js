const mongoose = require('mongoose')
const { Schema, model } = mongoose

const todoSchema = new Schema({
  todo: {
    type: String,
    required: [true, 'What are you gonna do?']
  },
  status: {
    type: Boolean,
    default: false
  },
  description: String,
  tags: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {timestamps: true})

const Todo = model('Todo', todoSchema)

module.exports = Todo