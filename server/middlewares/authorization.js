const Plan = require('../models/plan')
const Itinerary = require('../models/itinerary')

function planAuthorization(req,res,next){
    Plan.findById(req.params.id).then(plan=>{
        if (plan){
            if (plan.owner.toString() === req.decode.id){
                next()
            } else {
                throw {
                    name : 'Unauthorized',
                    customMessage : 'You are not authorized to do this action'
                }
            }
        } else {
            throw {
                name : 'NotFound',
                customMessage : 'Plan not found'
            }    
        }
    })
    .catch(next)
}

function itineraryAuthorization(req,res,next){
    Itinerary.findById(req.params.id).then(itinerary=>{
        if (itinerary){
            let isMember = false
            for (let i = 0; i < itinerary.participants.length; i++) {
                if (req.decode.id === itinerary.participants[i].toString()){
                    isMember = true
                    next()
                } 
            }
            if (!isMember){
                throw {
                    name : 'Unauthorized',
                    customMessage : 'You are not a member of this itinerary'
                }
            }
        } else {
            throw {
                name : 'NotFound',
                customMessage : 'Itinerary not found'
            }    
        }
    })
    .catch(err=>{
        if(err.name === 'CastError'){
            err.customMessage = 'Itinerary not found'
        }
        next(err)
    })
}

module.exports = {
    planAuthorization,
    itineraryAuthorization
}