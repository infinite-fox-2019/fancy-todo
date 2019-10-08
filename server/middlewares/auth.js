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
            msg: "Please Login First"
        }
    }
}

function authorization(req, res, next){
    User.findOne({email:req.loggedUser.email})
        .then(user => {
            if(!user){
                throw {
                    status: 404,
                    msg: "User Not Found"
                }
            }
            else if(req.loggedUser.email == user.email){
                next()
            }
            else{
                throw {
                    status: 401,
                    msg: "Not Authorized"
                }
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = {authentication, authorization} 