const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  projectTitle: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  member: [{ type: Schema.Types.ObjectId, ref: "User" }],
  todo : [{ type: Schema.Types.ObjectId, ref: "Todo" }]
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
