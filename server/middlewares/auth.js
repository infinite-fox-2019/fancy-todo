const {generateToken} = require('../helpers/jwt')
const {decodeToken} = require('../helpers/jwt')
const User = require('../models/user')
const Todo = require('../models/todo')


const authentication = (req, res, next) =>{
    try {
        const decode = decodeToken(req.headers.token)
        req.loggedUser = decode
        next()
    }

    catch (err){
        next({
            name: 'authenticationError',
            msg: 'you are not authenticated, please log in!'
        })
    }
}

const authorization = (req,res,next) => {
    Todo.findOne({
        _id: req.body._id
    })
    .then( todo => {
        if(String(req.loggedUser._id) === String(todo.userId)){
            next()
        } else {
            next({
                name: 'authorizationError',
                msg: 'you are not authorize!'
            })
        }
    })
    .catch(next)
}

module.exports = {
    authentication,
    authorization
}