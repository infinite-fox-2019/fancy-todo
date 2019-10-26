'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const { hash } = require('../helpers/bcryptjs')

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username required'],
        validate: {
            validator(value) {
                return new Promise((resolve, reject) => {
                    User.findOne({ username: value }).then(User => User ? resolve(false) : resolve(true))
                });
            },
            message: "Username is already taken."
        }
    },
    email: {
        type: String,
        required: [true, 'Email required'],
        match: [/^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Invalid email format"],
        validate: {
            validator(value) {
                return new Promise((resolve, reject) => {
                    User.findOne({ email: value }).then(User => User ? resolve(false) : resolve(true))
                });
            },
            message: "Email is already taken."
        }
    },
    password: {
        type: String,
        required: [true, 'Password required']
    }
}, { timestamps: true })


UserSchema.pre('save', function (next) {
    this.password = hash(this.password)
    next()
})

const User = mongoose.model('Users', UserSchema)

module.exports = User