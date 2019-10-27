const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const projectSchema = new Schema({
  OwnerId: {
    type: ObjectId,
    ref: 'User',
  },
  TodoId: [{type: ObjectId, ref: 'Todo'}],
  UserId: [{type: ObjectId, ref: 'User'}]
},{timestamps:true,versionKey:false})