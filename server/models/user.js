const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        validate: () => {
            
        }
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    todo: [
        {
            type: Schema.Types.ObjectId,
            ref: 'todo'
        }
    ]
})


const Model = mongoose.model('user', User)
module.exports = Model