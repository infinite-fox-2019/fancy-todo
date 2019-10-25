'use strict'

const mongoose = require('mongoose')
const { hashPassword } = require('../helpers/bcryptjs')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required']
  },
  email: {
    type: String,
    required: [true, 'E-mail is required'],
    validate: [{
      validator: function (value) {
        const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        return value.match(emailFormat)
      },
      message: props => `${props.value} is not a valid email format!`
    }, {
      validator: function (value) {
        return User.find({
          _id: { $ne: this._id },
          email: value
        })
          .then(data => {
            if (data.length !== 0) {
              throw new Error('E-mail has been used & registered!')
            }
          })
          .catch(err => {
            throw err
          })
      },
      message: props => `This email ${props.value} has already been used!`
    }]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Please insert minimum 8 character for the password']
  }
}, {
  timestamps: true,
  versionKey: false
})

userSchema.pre('save', function (next) {
  this.email = this.email.toLowerCase()
  this.password = hashPassword(this.password)
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
