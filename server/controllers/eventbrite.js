const eventbriteAPI = require('../apis/eventbriteAPI')
const evKey = process.env.EVENTBRITE_API_KEY

class EventbriteController{
    static getEvents(req,res,next){
        eventbriteAPI.get(`search?token=${evKey}&location.address=Finland&location.within=100km&expand=venue`)
        .then(({data})=>{
            res.status(200).json({
                data : data.events
            })
        })
        .catch(next)
    }
}

module.exports = EventbriteController