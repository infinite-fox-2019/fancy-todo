const Axios = require('../config/axios')
class EventController {
    static find(req, res, next) {
        Axios({
            method: `get`,
            url: `/events/search?location.address=jakarta`
        })
            .then(({ data }) => {
                res.status(200).json(data)
            })
            .catch(next)
    }
}

module.exports = EventController