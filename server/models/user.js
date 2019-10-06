const mongoose = require('mongoose')

const {hashPassword} = require('../helpers/bcryptjs')

let Schema = mongoose.Schema

let userSchema = new Schema({
    username: {type:String,required: [true, 'is required']},
    email: {type:String,required: [true, 'is required']},
    password: {type:String,required: [true, 'is required']},
    todolist: []
})

userSchema.pre('save',function(next){
    this.password = hashPassword(this.password)
    next()
})

let User = mongoose.model('User',userSchema)

module.exports = User