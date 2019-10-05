const {decodeToken} = require('../helpers/jwt')
const User = require('../models/User')

authentication = (req, res, next) => {
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

// authorization = (req, res, next) {

// }

module.exports = {
    authentication
}