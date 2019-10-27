const mongoose = require('mongoose')

const Schema = mongoose.Schema

const toDoSchema = new Schema({
    name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    list: Array
})

const ToDo = mongoose.model('ToDo', toDoSchema)

module.exports = ToDo;