const Event = require('../models/event')
const User = require('../models/user')

class EventController {
    static find(req, res, next) {
        Event.find().sort({ createdAt: -1 }).populate('member', 'name')
            .then(events => {
                res.status(200).json(events)
            })
            .catch(next)
    }

    static findById(req, res, next) {
        Event.findById(req.params.id).populate('member', 'name').populate('todos')
            .then(event => {
                res.status(200).json(event)
            })
            .catch(next)
    }

    static create(req, res, next) {
        let { name, location, start, end } = req.body
        Event.create({
            title: name,
            location,
            start_date: new Date(start),
            end_date: new Date(end),
            admin: req.decode.id,
            member: [req.decode.id]
        })
            .then(event => {
                User.updateOne(
                    { _id: req.decode.id },
                    {
                        $push: {
                            eventId: event._id
                        }
                    }
                )
                    .then(() => {
                        console.log('suksesss update')
                    })
                    .catch(err => {
                        console.log(err)
                    })

                res.status(201).json(event)
            })
            .catch(next)
    }

    static join(req, res, next) {
        Event.findByIdAndUpdate({ _id: req.params.id }, {
            $push: {
                member: req.decode.id
            }
        })
            .then(event => {
                User.updateOne(
                    { _id: req.decode.id },
                    {
                        $push: {
                            eventId: event._id
                        }
                    }
                )
                    .then(() => {
                        console.log('Join Event Success')
                    })
                    .catch(err => {
                        console.log(err)
                    })
                res.status(200).json(event)
            })
            .catch(next)
    }

    static addMember(req, res, next) {
        Event.findByIdAndUpdate({ _id: req.params.id }, {
            $push: {
                member: req.body.member
            }
        })
            .then(event => {
                User.updateOne({ _id: req.body.userId }, {
                    $push: {
                        eventId: event._id
                    }
                })
                    .then(() => {
                        console.log(`Join Event Success`)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                res.status(200).json(event)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        Event.findByIdAndDelete(req.params.id)
            .then(() => {
                res.status(200).json({ message: `Delete Event Success` })
            })
            .catch(next)
    }


}
module.exports = EventController