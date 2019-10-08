const { verifyToken } = require('../helpers/jwt')
const User = require('../models/user')

function authentication (req,res,next){
    try{
        const decode = verifyToken(req.headers.token)
        User.findOne({ username : decode.username })
        .then(user=>{
            if(user){
                req.decode = decode
                next()
            } else {
                throw {
                    name : 'NotFound',
                    customMessage : "Authentication error : User not found"
                }
            }
        })
        .catch(next)
    } catch(err) {
        next(err)
    }
}

module.exports = authentication