const mongoose = require('mongoose')
const {Schema} = mongoose
const {hashPassword} = require('../helpers/bcryptjs')

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email cannot be empty'],
        validate: {
            validator: (email) => {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            },
            msg: 'Wrong email format'
        }
    },
    password: {
        type: String,
        required: [true, 'Password cannot be empty'],
        validate: {
            validator: (password) => {
                str = password
                return (str.match(/[a-zA-Z]/g) && str.match(/[0-9]/g) && str.length >= 8)
            },
            msg: 'Password must be more than 8 character and contains letter and number'
        }
    },
    timepoint: {
        type: Number,
        default: 0
    }
})

userSchema.pre('save', function(next) {
    this.password = hashPassword(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User