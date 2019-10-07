const User = require('../models/user')
const {comparePassword} = require('../helpers/bcryptjs')
const {generateToken} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')

class UserController {
    static register (req,res,next) {
        const {username,password,email} = req.body
        User.findOne({email})
        .then(user => {
            if (user){
                throw {
                    msg: 'email is already taken',
                    statusCode: 401
                }
            }
            else{
                return User.create({username,password,email})
            }
        })
        .then(result => {
            let payload = {email:result.email}
            let token = generateToken(payload)
            res.status(201).json(token)
        })
        .catch(err=>{
            next(err.msg||err.message.slice(24))
        })
    }

    static login (req,res,next) {
        const {email,password} = req.body
        User.findOne({email})
        .then(user=>{
            if(user && comparePassword(password,user.password)) {
                let payload = {email:user.email}
                let token = generateToken(payload)
                res.status(200).json({token, username:user.username})
            } else {
                throw {
                    msg: 'invalid email/password',
                    statusCode: 401
                }
            }
        })
        .catch(next)
    }

    static signGoogle(req, res, next){
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let username
        let email
        console.log("--------");
        
        console.log(req.body.id_token);
        console.log("--------");

        client.verifyIdToken({
            
            idToken: req.body.id_token,
            audience: process.env.GOOGLE
        })
            .then(ticket => {
                username = ticket.getPayload().name
                email =  ticket.getPayload().email
                return User.findOne({email})
            })
            .then(user => {
                if (user){
                    const payload = {email}
                    let token = generateToken(payload)
                    res.status(201).json({token, username})
                }
                else{
                    return User.create({username, email, password:"google"})
                }
            })
            .then(result => {
                let payload = {email:result.email}
                let token = generateToken(payload)
                res.status(201).json({token, username})
            })
            .catch(next)
    }

    static authentication(req, res, next){
        User.findOne({email:req.loggedUser.email})
            .then(user => {
                res.status(200).json(user)
            })
    }

    static addToDoText(req, res, next){
        let {title, duedate} = req.body
        if(new Date(duedate) < new Date()){
            throw {
                msg: 'Due Date is Wrong',
                statusCode: 401
            }
        }
        else if(title && duedate){
            User.findOne({email:req.loggedUser.email})
                .then(user => {
                    if(user.todolist.length == 0){
                        req.body.id = "1"
                    }
                    else{
                        req.body.id = `${Number(user.todolist[user.todolist.length-1].id) + 1}`
                    }
                    return User.update({email:req.loggedUser.email} ,{"$push": { "todolist": req.body }})
                })
                .then(data => {
                    console.log(data);
                    res.status(200).json(data)
                })
                .catch(next)
        }
        else{
            throw {
                msg: 'Title and Due Date is required',
                statusCode: 401
            }
        }
    }

    static allToDoList(req, res, next){
        User.findOne({email:req.loggedUser.email})
            .then(user => {
                // console.log(user.todolist);
                res.status(200).json(user.todolist)
            })
            .catch(next)
    }

    static updateToDo(req, res, next){
        let {title, duedate} = req.body
        if(new Date(duedate) < new Date()){
            throw {
                msg: 'Due Date is Wrong',
                statusCode: 401
            }
        }
        else if(title && duedate){
            User.update(
                {email:req.loggedUser.email}, 
                {"$set": { "todolist.$[element]": req.body}}, 
                { arrayFilters: [ { "element.id" : req.body.id} ], new: true }
            )   
                .then(data => {
                    // console.log(data);
                    res.status(200).json(data)
                })
                .catch(next)
        }
        else{
            throw {
                msg: 'Title and Due Date is required',
                statusCode: 401
            }
        }
    }
    
    static delToDo(req, res, next){
        User.update({email:req.loggedUser.email}, {"$pull": { "todolist": {"id" : req.body.id} }}, {safe: true, multi:true})
            .then(data => {
                // console.log(data);
                res.status(200).json(data)
            })
            .catch(next)
    }
}

module.exports = UserController