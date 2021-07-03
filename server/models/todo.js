const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: String,
  description: String,
  status:{
    type:Boolean,
    default: false
  },
  dueDate: Date,
  user: { type: Schema.Types.ObjectId, ref: "User" }
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
