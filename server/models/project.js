const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  projectTitle: String,
  owner: Schema.Types.ObjectId,
  member: [Schema.Types.ObjectId],
  todo: [Schema.Types.ObjectId]
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
