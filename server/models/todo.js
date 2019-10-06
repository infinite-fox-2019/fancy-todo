const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema ({
  name: {
    type: String,
    required: [true, `Todo must be filled`]
  },
  description: {
    type: String,
    required: [true, `Description Must be filled`]
  },
  dueDate: {
    type: Date
  },
  status: {
    type: Boolean
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
})

const Todo = mongoose.model( 'Todo', todoSchema )
module.exports = Todo