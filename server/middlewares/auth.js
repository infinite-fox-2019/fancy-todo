const { varify } = require('../helpers/jwt')
const Event = require('../models/event')
const Todo = require('../models/todo')

function Authentication(req, res, next) {
    try {
        let decode = varify(req.headers.token)
        req.decode = decode
        next()
    } catch (err) {
        next(err)
    }
}

function Authorization(req, res, next) {
    Event.findById(req.params.id)
        .then(event => {
            if (event.member == req.decode.id) {
                next()
            } else {
                next({
                    status: 403,
                    message: `you don't have the authority to do this action`
                })
            }
        })
        .catch(next)
}

module.exports = {
    Authentication,
    Authorization
}