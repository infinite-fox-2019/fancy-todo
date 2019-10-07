const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const { hashPassword } = require('../helpers/bcrypt')
const Schema = mongoose.Schema

const validateEmail = function(email) {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email)
};

const userSchema = new Schema ({
    username : {
        type : String,
        trim : true,
        unique : true,
        required : [true, 'username required']
    },
    email : {
        type : String,
        trim : true,
        unique : true,
        required : [true,'email is needed'],
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password : {
        type : String,
        trim : true,
        required : [true,'password required to register/login']
    }
})

userSchema.pre('save', function(next){
    this.password = hashPassword(this.password)
    next()
})

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema)

module.exports = User
