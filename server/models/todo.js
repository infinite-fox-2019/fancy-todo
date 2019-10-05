const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todo = new Schema({
  title: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  dueDate : String,
  descriptions: String,
  status: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

const todos = mongoose.model("todos", todo);

module.exports = todos;
