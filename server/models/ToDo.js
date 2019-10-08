const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todo = new Schema (
    {
        date: String,
        activity: String,
        User_Id: String
    }
)

const ToDo = mongoose.model("ToDos", todo)
module.exports = ToDo