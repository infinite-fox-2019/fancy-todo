const mongoose = require('mongoose')
const { hash } = require('../helpers/bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, `Invalid email address`]

    },
    password: String
})

userSchema.pre('save', function(next) {
    this.password = hash(this.password)
    next()
})

const User = mongoose.model('User', userSchema)


module.exports = User