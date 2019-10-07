const Itinerary = require('../models/itinerary')
const User = require('../models/user')
const Plan = require('../models/plan')

class ItineraryController {

    static create(req,res,next){
        const itinerary = {
            name : req.body.name,
            description : req.body.description,
            owner : req.decode.id,
            participants : [req.decode.id],
            createdAt : new Date()
        }
        Itinerary.create(itinerary).then(itinerary=>{
            res.status(201).json({
                itinerary
            })
        })
        .catch(console.log)
    }

    static read(req,res,next){
        Itinerary.find().then(itineraries=>{
            let participated = []
            for (let i = 0; i < itineraries.length; i++) {
                for (let j = 0; j < itineraries[i].participants.length; j++) {
                    if(req.decode.id === itineraries[i].participants[j].toString()){
                        participated.push(itineraries[i])
                    }
                }
            }
            res.status(200).json({
                itineraries : participated
            })
        })
        .catch(next)
    }

    static findByOwner(req,res,next){
        Itinerary.find({owner:req.query.owner}).then(itineraries=>{
            res.status(200).json(itineraries)
        })
        .catch(console.log)
    }

    static update(req,res,next){
        const {name, description} = req.body
        const update = {
            name,
            description
        }
        Itinerary.findByIdAndUpdate(req.params.id,update,{omitUndefined : true, new : true, runValidators : true})
        .then(itinerary=>{
            res.status(200).json({
                itinerary
            })
        })
        .catch(next)
    }

    static delete(req,res,next){
        Itinerary.findById(req.params.id).then(itinerary=>{
            if(itinerary.owner.toString() === req.decode.id){
                Itinerary.findByIdAndDelete(req.params.id).then(deletedItinerary=>{
                    res.status(200).json({
                        itinerary : deletedItinerary
                    })
                })
            } else {
                throw {
                    name : 'Unauthorized',
                    customMessage : 'Owner access required for this action'
                }
            }
        })
        .catch(next)
    }

    static addPlan(req,res,next){
        Itinerary.findById(req.params.id).then(itinerary=>{
            return Plan.findById(req.body.plan).then(plan=>{
                if(plan){
                    let isInItinerary = false
                    for (let i = 0; i < itinerary.plans.length; i++) {
                        if(plan._id.toString() === itinerary.plans[i].toString()){
                            isInItinerary = true
                        }   
                    }
                    if (!isInItinerary){
                        itinerary.plans.push(req.body.plan)
                        Itinerary.findByIdAndUpdate(req.params.id,itinerary,{new : true})
                        .then(updatedItinerary=>{
                            res.status(200).json({
                                itinerary : updatedItinerary
                            })
                        })
                    } else {
                        throw {
                            name : 'RequestError',
                            customMessage : 'Cannot add plan to the itinerary: Plan already in the itinerary'
                        }
                    }
                } else {
                    throw {
                        name : 'NotFound',
                        customMessage : 'Cannot add plan to the itinerary: Plan not found'
                    }
                }
            })
        })
        .catch(err=>{
            if(err.name === 'CastError'){
                err.customMessage = 'Cannot add plan to the itinerary: Plan not found'
            }
            next(err)
        })
    }

    static addParticipant(req,res,next){
        Itinerary.findById(req.params.id).then(itinerary=>{
            return User.findById(req.body.participant).then(user=>{
                if(user){
                    let isAlreadyParticipant = false
                    for (let i = 0; i < itinerary.participants.length; i++) {
                        if(user._id.toString() === itinerary.participants[i].toString()){
                            isAlreadyParticipant = true
                        }
                    }
                    if (!isAlreadyParticipant){
                        itinerary.participants.push(req.body.participant)
                        Itinerary.findByIdAndUpdate(req.params.id,itinerary,{new : true})
                        .then(updatedItinerary=>{
                            res.status(200).json({
                                itinerary : updatedItinerary
                            })
                        })
                    } else {
                        throw {
                            name : 'RequestError',
                            customMessage : 'Cannot add user to the itinerary: User already in the itinerary'
                        }
                    }
                } else {
                    throw {
                        name : 'NotFound',
                        customMessage : 'Cannot add user to the itinerary: User not found'
                    }
                }
            })
        })
        .catch(err=>{
            if(err.name === 'CastError'){
                err.customMessage = 'Cannot add user to the itinerary: User not found'
            }
            next(err)
        })
    }

    static deletePlan(req,res,next){
        Itinerary.findById(req.params.id).then(itinerary=>{
            return Plan.findById(req.body.plan).then(plan=>{
                if(plan){
                    let deletePerformed = false
                    for (let i = 0; i < itinerary.plans.length; i++) {
                        if(plan._id.toString() === itinerary.plans[i].toString()){
                            itinerary.plans.splice(i, 1);
                            deletePerformed = true
                        }
                    }
                    itinerary.save()
                    if (!deletePerformed){
                        throw {
                            name : 'RequestError',
                            customMessage : 'Cannot delete plan from the itinerary: Plan is not in the itinerary'
                        }
                    } else {
                        res.status(200).json({
                            msg : 'Plan removed from itinerary'
                        })
                    }
                } else {
                    throw {
                        name : 'NotFound',
                        customMessage : 'Cannot delete from the itinerary: Plan not found'
                    }
                }
            })
        })
        .catch(err=>{
            if(err.name === 'CastError'){
                err.customMessage = 'Cannot delete from the itinerary: Plan not found'
            }
            next(err)
        })
    }

    static deleteParticipant(req,res,next){
        Itinerary.findById(req.params.id).then(itinerary=>{
            return User.findById(req.body.participant).then(user=>{
                if(user){
                    let deletePerformed = false
                    for (let i = 0; i < itinerary.participants.length; i++) {
                        if(user._id.toString() === itinerary.participants[i].toString()){
                            itinerary.participants.splice(i, 1);
                            deletePerformed = true
                        }
                    }
                    itinerary.save()
                    if (!deletePerformed){
                        throw {
                            name : 'RequestError',
                            customMessage : 'Cannot delete user from the itinerary: User not a member of itinerary'
                        }
                    } else {
                        res.status(200).json({
                            msg : 'User removed from itinerary'
                        })
                    }
                } else {
                    throw {
                        name : 'NotFound',
                        customMessage : 'Cannot delete from the itinerary: User not found'
                    }
                }
            })
        })
        .catch(err=>{
            if(err.name === 'CastError'){
                err.customMessage = 'Cannot delete from the itinerary: User not found'
            }
            next(err)
        })
    }
}

module.exports = ItineraryController