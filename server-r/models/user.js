const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const {generateHash} = require('../helpers/bcrypt')

const userSchema = new Schema({
  name:{
    type: String,
    required: "Name is required"
  },
  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    required: "Email is required"
  },
  password: {
    type: String,
    required: "Password is required"
  },
  ProjectId: [{
    type: ObjectId,
    ref: 'Project'
  }]
},{timestamps:true,versionKey:false})

userSchema.pre('save', function(next){
  this.password = generateHash(this.password)
  next()
})

const User = mongoose.model('User', userSchema)
module.exports = User