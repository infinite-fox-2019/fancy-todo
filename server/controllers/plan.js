const Plan = require('../models/plan')

class PlanController {

    static create(req,res,next){
        const {event, description, address, image, time} = req.body
        const owner = req.decode.id
        const plan = {
            event,
            description,
            address,
            image,
            time,
            owner
        }
        Plan.create(plan).then(plan=>{
            res.status(201).json({
                plan
            })
        })
        .catch(next)
    }

    static read(req,res,next){
        Plan.find({owner:req.decode.id}).then(plans=>{
            res.status(200).json({
                plans
            })
        })
        .catch(console.log)
    }

    static find(req,res,next){
        Plan.findById(req.query.plan).then(plan=>{
            res.status(200).json(plan)
        })
        .catch(console.log)
    }

    static delete(req,res,next){
        Plan.findByIdAndDelete(req.params.id).then(deletedPlan=>{
            res.status(200).json({
                plan : deletedPlan
            })
        })
        .catch(next)
    }

    static update(req,res,next){
        const {event, description, status, address, time} = req.body
        const update = {
            event,
            description,
            status,
            address,
            time
        }
        Plan.findByIdAndUpdate(req.params.id,update,{omitUndefined : true, new : true, runValidators : true})
        .then(updatedPlan=>{
            res.status(200).json({
                plan : updatedPlan
            })
        })
        .catch(next)
    }
}

module.exports = PlanController