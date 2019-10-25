'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please insert a title for todo!']
  },
  description: String,
  status: { type: Boolean, default: false },
  dueDate: {
    type: Date,
    min: [new Date().toLocaleDateString(), 'Minimum due date is today!'],
    required: true
  },
  urgency: { type: Boolean, default: false },
  UserId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ProjectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }
}, {
  timestamps: true,
  versionKey: false
})

todoSchema.pre('save', function (next) {
  if (!this.ProjectId) {
    this.ProjectId = null
  }
  next()
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
