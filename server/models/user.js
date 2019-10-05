const mongoose = require('mongoose')
const { hashPassword } = require('../helpers/bcryptjs')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    eventId: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }]
})

userSchema.pre('save', function (next) {
    this.password = hashPassword(this.password)
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User