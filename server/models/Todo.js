const mongoose = require('mongoose');
const Schema = mongoose.Schema

const TodoSchema = new Schema({
  "title": {
    type: "String",
    required: [true, "Title Required"]
  },
  "description": {
    "type": "String",
    default: null
  },
  "status": {
    "type": "Boolean",
    default: false
  },
  dueDate: { type: Date, required: [true, "Due Date must be set"] },
  owner: { type: Schema.Types.ObjectId, ref: 'Users' },
  inProject: { type: Schema.Types.ObjectId, ref: "Projects", default: null }
}, { timestamps: true })

const Todo = mongoose.model('Todos', TodoSchema)

module.exports = Todo