const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {hashPassword} = require('../helpers/hashPassword')

let userSchema = new Schema({
    name: {
        type: String, 
        required: true
    },

    email: {
        type: String, 
        required: true
    }, 

    password: {
        type: String, 
        required: true
    }, 

    todoList: [{
        type: Schema.Types.ObjectId,
        ref:'Todo'
    }]
})

userSchema.pre('save', function(next) {
    this.password = hashPassword(this.password)
    next()
})

let User = mongoose.model('User', userSchema)

module.exports = User