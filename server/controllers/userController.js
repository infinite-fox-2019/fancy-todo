const User = require('../models/user')
const {comparePassword} = require('../helpers/bcryptjs')
const {generateToken} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')

class UserController {
    static dataUser (req,res,next) {
        User.findOne({username:req.loggedUser.username})
        .then(user => {
            // console.log(user);
            res.status(200).json(user)
        })
        .catch(next)
    }

    static register (req,res,next) {
        const {username,email,password} = req.body
        User.findOne({username})
        .then(user => {
            if (user){
                throw {
                    msg: 'username is already taken',
                    statusCode: 401
                }
            }
            else{
                return User.create({username,email,password})
            }
        })
        .then(result => {
            let payload = {username:result.username}
            let token = generateToken(payload)
            res.status(201).json(token)
        })
        .catch(err=>{
            next(err.msg||err.message.slice(24))
        })
    }
    static login (req,res,next) {
        const {username,password} = req.body
        User.findOne({username})
        .then(user=>{
            if(user && comparePassword(password,user.password)) {
                console.log('tesssssssss masuk');
                
                let payload = {username:user.username}
                let token = generateToken(payload)
                res.status(200).json(token)
            } else {
                console.log('tes tidakkkkk');
                
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
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.GOOGLE
        })
            .then(ticket => {
                
                username= ticket.getPayload().name
                email= ticket.getPayload().email
                
                return User.findOne({username})
            })
            .then(user => {
                if (user){
                    const payload = {username}
                    let token = generateToken(payload)
                    res.status(201).json(token)
                }
                else{
                    console.log(',asssdfsfsdfsdfs nih');
                    return User.create({username,email, password:"google"})
                }
            })
            .then(result => {
                let payload = {username:result.username}
                let token = generateToken(payload)
                res.status(201).json(token)
            })
            .catch(next)
    }
    static authentication(req, res, next){
        res.status(200).json("token benar")
    }
    static allTodo(req, res, next){
        User.findOne({username:req.loggedUser.username})
            .then(user => {
                console.log(user.todo_list);
                res.status(200).json(user.todo_list)
            })
            .catch(next)
    }
    static addTodo(req, res, next){
        // console.log('tesssssssssss');
        
        let {title,description,dueDate} = req.body
        req.body.status = 'on progress'
        if(title && dueDate) {
            User.findOne({username:req.loggedUser.username})
            .then(user=>{

                if(user.todo_list.length === 0 ){
                    req.body.id = '1'
                } else {
                    req.body.id = `${Number(user.todo_list[user.todo_list.length-1].id) +1}`
                    console.log(req.loggedUser.username);
                    
                    
                }
                return User.update({username:req.loggedUser.username},{"$push":{"todo_list":req.body}})
            })
            .then(data=>{
                // console.log('masukkkkkkkkkkkkkkk');
                console.log('tesssssssssssssssssssssssss');
                
                res.status(201).json(data)
            })
            .catch(next)
        } else {
            // throw {
            //     msg:''
            // }
            //pesan error kalau title sama due date required
        }
    }
    static deleteTodo(req,res,next) {
        User.update({username:req.loggedUser.username}, {"$pull": { "todo_list": {"id" : req.body.id} }}, { safe: true, multi:true })
        .then(data => {
            // console.log(data);
            res.status(200).json(data)
        })
        .catch(next)
    }
    static updateTodo(req,res,next) {
        console.log('tes');
        
        let {title, dueDate,status} = req.body
        if(title && dueDate){
            console.log('tes');
            User.update(
                {username:req.loggedUser.username}, 
                {"$set": { "todo_list.$[element]": req.body}}, 
                { arrayFilters: [ { "element.id" : req.body.id} ], new: true }
            )   
                .then(data => {
                    // console.log(data);
                    res.status(200).json(data)
                })
                .catch(next)
        }
        else{
            console.log('tes');
            throw {
                msg: 'Title and Due Date is required',
                statusCode: 401
            }
        }
    }
}

module.exports = UserController