const {VerifyToken} = require('../helpers/jwt')
const User = require('../models/user')

function authentication(req, res, next){
    try {
        let decodedToken = VerifyToken(req.headers.token)
        req.loggedUser = decodedToken
        next()
    }
    catch {
        throw {
            status: 403,
            msg: "login first"
        }
    }
}

function authorization(req, res, next){
    User.findOne({username:req.loggedUser.username})
        .then(user => {
            if(!user){
                throw {
                    status: 404,
                    msg: "not found"
                }
            }
            else if(req.loggedUser.username == user.username){
                next()
            }
            else{
                throw {
                    status: 401,
                    msg: "not authorized"
                }
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = {authentication, authorization} 