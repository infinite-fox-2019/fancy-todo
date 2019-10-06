const {decodeToken} = require('../helpers/jwt')
const User = require('../models/User')

authentication = (req, res, next) => {
    if(!req.headers.token) {
        throw {status: 401, title:'Access Denied', msg:'You\'re session is expired'}
    }
    let email = decodeToken(req.headers.token).email 
    User.findOne({email})
    .then(user => {
        if(!user) {
            throw {status: 401, title:'Access Denied', msg:'You have to login first'}
        } else {
            req.loggedUser = user
            next()
        }
    })
    .catch(next)
}

authorization = (req, res, next) => {
    console.log('masuk')
    Task.findByPk(req.params.id)
    .then(task => {
        if(!task) {
            throw {status: 404, message: 'Task data not found'}
        } else {
            if(task.userId !== req.loggedUser.id) {
                throw {status: 401, message: 'You are unauthorized to access this data'}
            } else {
                next()
            }
        }
    })
    .catch(next)
}

module.exports = {
    authentication,
    authorization
}