'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Project\'s name is required']
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  todos: [{
    type: Schema.Types.ObjectId,
    ref: 'Todo'
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Project owner is required']
  }
}, {
  timestamps: true,
  versionKey: false
})

projectSchema.pre('save', function (next) {
  this.members.push(this.owner)
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project
