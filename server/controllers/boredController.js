const bored = require('../apis/bored')
// const axios = require('axios')

class BoredController {
    static search(req,res,next) {
        bored.get('api/activity')
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }
}

module.exports = BoredController