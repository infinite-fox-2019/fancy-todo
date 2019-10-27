const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.ObjectId

const todoSchema = new Schema({
  UserId : {
    type: ObjectId,
    ref: 'User'
  },
  PorjectId: {
    type: ObjectId,
    ref: 'Project'
  },
  title:{
    type: String,
    required: true
  },
  description: {
    type: String,
    required: "Description required"
  }
}, {timestamps:true,versionKey: false})

//Hash password here

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo