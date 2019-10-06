const mongoose = require('mongoose')
const {Schema} = mongoose

const todoSchema = Schema({
  name : {
    type : String,
    required : [true, 'Title is required']
  },
  description : {
    type : String,
    required : [true, 'Description is required']
  },
  status : {
    type: Boolean,
    default: false
  },
  dueDate : {
    type : Date,
    required: [true, 'Due date is required']
  },
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
}
},{
    timestamps: true,
    versionKey: false
})

const Todo  = mongoose.model('Todo',todoSchema)

module.exports = Todo

