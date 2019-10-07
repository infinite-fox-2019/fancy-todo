const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hashPassword = require('../Helpers/hashPassword')

const userSchema = new Schema({
    username: {
        type: String,
        validate: {
            validator: function(value) {
                return this.model('User').findOne({ username: value })
                    .then(function(user) {
                        if (user) {
                            return false
                        } else {
                            return true
                        }
                    })
            },
            message: props => `${props.value} already taken`
        },
        required: [true, 'Username cannot be empty']
    },
    email: {
        type: String,
        unique: true,
        validate: [{
                validator: function(email) {
                    return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email)
                },
                message: props => `${props.value} is not a valid email!`
            },
            {
                validator: function(value) {
                    return this.model('User').findOne({ email: value })
                        .then(function(email) {
                            if (email) {
                                return false
                            } else {
                                return true
                            }
                        })
                },
                message: props => `${props.value} already taken`
            }
        ],
        required: [true, 'Email Cannot be Empty']
    },
    password: { type: String, required: [true, 'Password Cannot be Empty'] }
})

userSchema.pre('save', function(next) {
    pass = this.password;
    this.password = hashPassword.hash(pass);
    next()
})

const user = mongoose.model('User', userSchema);
module.exports = user


//CRUD endpoints untuk Todo (name, description, status, due date)