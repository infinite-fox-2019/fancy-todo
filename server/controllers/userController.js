const {OAuth2Client} = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {comparePassword} = require('../helpers/hashPassword');
const Todo = require('../models/todo');

let dummyUsername = ''
for(let i=0;i<10;i++){
    let secretDummy = process.env.DUMMY_USERNAME
    let key = secretDummy;
    let rand = Math.round(Math.random() * key.length)
    dummyUsername += key[rand];
}

class UserController {
    static signinGoogle(req,res,next){
        let email = '';
        let name = '';
        let serverToken = '';
        let photo = '';
        let getUserId = '';
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        client.verifyIdToken({
            idToken : req.body.id_token,
            audience : process.env.GOOGLE_CLIENT_ID
        })
        .then(function(ticket){
            const payload = ticket.getPayload() //get username,email dari google
            name = payload.name;
            email = payload.email;
            photo = payload.picture;
            serverToken = jwt.sign(payload,process.env.JWT_SECRET);

             return User.find()
        })
        .then(function(data){
            let pass = true;
            for(let i=0;i<data.length;i++){
                if(data[i].email === email) pass=false;
            }
            if(!pass) {
                return User.findOne({
                    email : email
                })
                // res.status(200).json({serverToken,photo,name})
            }
            else if(pass){
                User.create({
                    username : dummyUsername,
                    password : dummyUsername,
                    email : email,
                    photo : photo
                })
                .then(function(success){
                    res.status(200).json({serverToken,photo,name});
                })
            }
        })
        .then(function(user){
            getUserId = user._id;
            return Todo.find({
                UserId : getUserId
            })
        })
        .then(function(todos){
            let todoList = [];
            for(let i=0;i<todos.length;i++){
                todoList.push({
                    due_date : todos[i].due_date,
                    title : todos[i].title,
                    description : todos[i].description,
                    status : todos[i].status,
                    createdAt : todos[i].createdAt,
                    todoId : todos[i]._id
                })
            }
            if(todoList.length == 0) {
                console.log('if')
                res.status(200).json({serverToken,photo})
            }else{
                console.log('masuk create')
                res.status(200).json({
                    serverToken,
                    photo,
                    todoList,
                    name
                })
            }
        })
        .catch(function(err){
            next(err)
        })
    }
    static register(req,res,next){
        let {username,password,email} = req.body;
        User.find()
            .then(function(users){
                let pass = true;
                for(let i=0;i<users.length;i++){
                    if(users[i].email == email || users[i].username == username) pass=false;
                }
                if(!pass) throw ({status:403,msg:'Username/email telah digunakan'});
                else {
                    return User.create({
                        username,
                        password,
                        email
                    })
                }
            })
            .then(function(success){
                res.status(201).json('Success Created');
            })
            .catch(function(err){
                console.log('2')
                next(err)
            })
    }
    static signinDefault(req,res,next){
        let {username,password} = req.body;
        let getUsername = '';
        let getEmail = '';
        User.findOne({
            username : username
        })
            .then(function(user){
                let pass = false;
                if(comparePassword(password,user.password)) pass=true;
                if(!pass) throw ({status:403,msg:'Username/Password salah!'});
                else {
                    getUsername = user.username;
                    getEmail = user.email;

                    return Todo.find({
                        UserId : user._id
                    })
                }

            })
            .then(function(todo){
                let {due_date,title,description,status} = todo;
                const payload = {
                    username : getUsername,
                    email : getEmail
                }
                const getToken = jwt.sign(payload,process.env.JWT_SECRET);
                if(todo.length==0) res.status(200).json({getToken,username});
                else{
                    let todoList = [];
                    for(let i=0;i<todo.length;i++){
                        todoList.push({
                            due_date : todo[i].due_date,
                            title : todo[i].title,
                            description : todo[i].description,
                            status : todo[i].status,
                            createdAt : todo[i].createdAt,
                            todoId : todo[i]._id
                        })
                    }
                    res.status(200).json({
                        getToken,
                        username,
                        todoList
                    })
                }
            })
            .catch(function(err){
                next({status:403,msg:'username/password salah!'})
            })
    }
}


module.exports = UserController;