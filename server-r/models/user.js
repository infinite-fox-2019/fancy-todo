const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
  }

},{timestamps:true,versionKey:false})

const User = mongoose.model('User', userSchema)
module.exports = User