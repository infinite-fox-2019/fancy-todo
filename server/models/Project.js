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
  owner: { type: Schema.Types.ObjectId, ref: "Users" },
  inviteLink: { type: String }
}, { timestamps: true })

ProjectSchema.pre('save', function (next) {
  const base = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let gen = ''
  while (gen.length < 7) {
    let randIndex = Math.floor(Math.random() * base.length)
    gen += base[randIndex]
  }
  this.inviteLink = gen
  this.members.push(this.owner)
  next()
})

const Project = mongoose.model('Projects', ProjectSchema)

module.exports = Project