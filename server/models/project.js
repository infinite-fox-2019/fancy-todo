const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "project name is required"]
    },
    description: String,
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    todos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Todo"
      }
    ]
  },
  {
    timestamps: true
  }
);

const Project = model("Project", projectSchema);
module.exports = Project;
