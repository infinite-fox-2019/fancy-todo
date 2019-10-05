const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todo = new Schema({
  title: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  dueDate : String,
  descriptions: String,
  status: { type: String, default: "New" },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

const todos = mongoose.model("todos", todo);

module.exports = todos;
