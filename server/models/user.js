// STATE VARIABLES
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashPassword } = require('../helpers/bcrypt')

// Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username Is Required.']
    },
    email: {
        type: String,
        required: [true, 'E-mail Is Required.']
    },
    password: {
        type: String,
        required: [true, 'Password Is Required.']
    }
})

//MIDDLEWARE
userSchema.pre('save', function (next) {
    this.password = hashPassword(this.password)
    next()
})

//MODEL
const User = mongoose.model('User', userSchema)

module.exports = User