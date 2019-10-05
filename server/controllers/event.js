const Event = require('../models/event')

class EventController {
    static find(req, res, next) {
        Event.find().populate('member')
            .then(events => {
                res.status(200).json(events)
            })
            .catch(next)
    }
}
module.exports = EventController