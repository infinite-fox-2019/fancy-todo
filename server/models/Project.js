const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
  "name": {
    "type": "String",
    required: [true, "Project Name required"]
  },
  "members": {
    "type": [{ type: Schema.Types.ObjectId, ref: "Users" }],
  },
  "todos": {
    "type": [{ type: Schema.Types.ObjectId, ref: "Todos" }],
  },
  owner: { type: Schema.Types.ObjectId, ref: "Users" }
}, { timestamps: true })

ProjectSchema.pre('save', function (next) {
  this.members.push(this.owner)
  next()
})

const Project = mongoose.model('Projects', ProjectSchema)

module.exports = Project