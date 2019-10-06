const { Schema, model } = require("mongoose");

const todoSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "todo name is required"]
    },
    description: String,
    status: {
      type: String,
      default: "undone"
    },
    dueDate: Date,
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project"
    }
  },
  {
    timestamps: true
  }
);

const Todo = model("Todo", todoSchema);

module.exports = Todo;
