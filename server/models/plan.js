const mongoose = require ('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const ObjectId = mongoose.Types.ObjectId
const Schema = mongoose.Schema

const planSchema = new Schema ({
    event : {
        type : String,
        required : [true, 'event name required']
    },
    description : {
        type : String,
        required : [true, 'event description required']
    },
    status : {
        type : String,
        enum : ['planned','cancelled','done'],
        default : 'planned',
    },
    address : {
        type : String,
        required : [true, 'address for this event is required']
    },
    image : {
        type : String
    },
    time : {
        type : Date,
        required : [true, 'start of the event is required']
    },
    owner : {
        type : ObjectId,
        ref : 'User'
    },
    itinerary : {
        type : ObjectId,
        ref : 'Itinerary'
    }
})

planSchema.plugin(uniqueValidator);

const Plan = mongoose.model('Plan', planSchema)

module.exports = Plan