const mongoose = require ('mongoose')
const ObjectId = mongoose.Types.ObjectId
const Schema = mongoose.Schema

const itinerarySchema = new Schema ({
    name : {
        type : String,
        trim : true,
        required : [true, 'itinerary must have a name']
    },
    description : {
        type : String,
        trim : true,
        required : [true, 'itinerary must have description']
    },
    owner : {
        type : ObjectId,
        ref : 'User',
    },
    participants : [{
        type : ObjectId,
        ref : 'User'
    }],
    plans : [{
        type : ObjectId,
        ref : 'Plan'
    }],
    createdAt : {
        type : Date
    }
})

const Itinerary = mongoose.model('Itinerary', itinerarySchema)

module.exports = Itinerary