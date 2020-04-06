const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const users = new Schema({
  name: String,
  hash: String,
  email: String,
  todoList : [{
    type : Schema.Types.ObjectId, ref: 'todos'
  }]
});

const User = mongoose.model("User", users);

module.exports = User;