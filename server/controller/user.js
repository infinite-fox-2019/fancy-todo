const User = require('../models/user')
const {generateToken} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')

class Controller{
    static register(req,res,next){
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        .then( user => {
            res.status(201).json(user)
        })
        .catch(next)
    }

    static login(req,res,next){
        User.findOne({
            email: req.body.email
        })
        .then( user => {
            if(!user)next({name:'loginError' ,msg:'user not found'})
            else if(user.password !== req.body.password){
                next({name:'loginError', msg:'wrong email/password!!'})
            }
            else{
                let payload = {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
                let token = generateToken(payload)
                res.status(200).json({token, user: payload})
            }
        })
        .catch(next)
    }

    static googleLogin(req,res,next){
        const client = new OAuth2Client(process.env.GOOGLE_OAUTH)
        client.verifyIdToken({
            idToken :req.headers.gtoken,
            audience :process.env.GOOGLE_OAUTH
        })
        .then( ticket => {
            const googlepayload = ticket.getPayload()
            return User.findOne({
                email: googlepayload.email
            })
        })
        .then( (user) => {
            if(user){
                let payload = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,  
                }
                let token = generateToken(payload)
                res.status(200).json({token, user: payload})
                next()
            } else {
                return User.create({
                    name: googlepayload.name,
                    email: googlepayload.email,
                    password: 'google'
                })
            }
        })
        .then( user => {
            let payload = {
                _id: user._id,
                name: user.name,
                email: user.email  
            }
            let token = generateToken(payload)
            res.status(200).json({token, user: payload})
        })
        .catch(next)
    }


    static findOne(req,res,next){
        User.findOne({
            _id: req.loggedUser._id
        }).populate({path: 'todo', options: {sort: {'createdAt' : -1 } } })
        .then( data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static deleteTodo(req,res,next){
        User.update( { _id : req.loggedUser._id }, { $pull:  { "todo" : req.body.todoId } } )
        .then( updatedData => {
            res.status(200).json({
                msg: 'successfully deleted'
            })
        })
        .catch(next)
    }
}


module.exports = Controller