const mongoose = require('mongoose')
const {Schema} = mongoose

const User = mongoose.model('User', new Schema({
    email: String,
    password: String
}))

module.exports = User