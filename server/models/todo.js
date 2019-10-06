
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('../helpers/moment')

const Todo = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    activity: {
        type: String,
        required: [true, 'required activity title']
    },
    description: {
        type: String,
        required: [true, 'you must fill the description form']
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    due_date: {
        type: Date
    },
    status : {
        type: Boolean,
        default: false
    }
})

const Model = mongoose.model('todo', Todo)


module.exports = Model