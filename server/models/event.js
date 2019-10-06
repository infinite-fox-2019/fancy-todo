const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    title: {
        type: String,
        required: [true, `Name Event must be filled`],
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    member: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    todos: [{
        type: Schema.Types.ObjectId,
        ref: 'Todo'
    }]
}, {
    timestamps: true
})

const Event = mongoose.model('Event', eventSchema)
module.exports = Event