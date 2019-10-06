const mongoose = require('mongoose')
const { hashPassword } = require('../helpers/bcryptjs')
var uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, `Name must be filled`]
    },
    email: {
        type: String,
        required: [true, `Email must be filled`,],
        unique: [true, `Email already registered`],
        validate: {
            validator: function (value) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
            },
            message: 'Invalid email format'
        }
    },
    password: {
        type: String,
        min: [5, `password min 5 character`],
        required: [true, `Password must be filled`]
    },
    eventId: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }]
})

userSchema.pre('save', function (next) {
    this.password = hashPassword(this.password)
    next()
})
userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)
module.exports = User