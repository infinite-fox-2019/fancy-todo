const {OAuth2Client} = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {comparePassword} = require('../helpers/hashPassword');
const Todo = require('../models/todo');
const {sendMail} = require('../serverMail');
// function sendMail(receiver,msg){
    


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
        let password = ''
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
                if(data[i].email === email) {
                    pass=false;
                    password = data[i].password
                }
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
                    sendMail(email,{
                        msg : 
                        `Welcome, now your email has been automatically registered in our database ..
                        your current data:
                        username: ${dummyUsername}
                        password: ${password}
                        please change your username and password immediately for security :)
                        for more information you can reply to this email thank you
                        NB: This message is automatically answered`
                    })
                    res.status(200).json({serverToken,photo,name,msg:"Check your Email :)"});
                    req.headers.token = serverToken
                    console.log('terkirim please')
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
            if(todos ===undefined) res.status(200).json({serverToken,photo,name})
            else{
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
                    res.status(200).json({serverToken,photo})
                    req.headers.token = serverToken
                }else{
                    res.status(200).json({
                        serverToken,
                        photo,
                        todoList,
                        name
                    })
                    req.headers.token = serverToken
                }
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
                if(success){
                    sendMail(email,{
                        msg : 
                        `Welcome, now your email has been automatically registered in our database ..
                        your current data:
                        username: ${username}
                        password: ${success.password}
                        Have a nice Day :)
                        for more information you can reply to this email thank you
                        NB: This message is automatically answered`
                    })
                    res.status(201).json('Success Created');
                }else{
                    throw ({status:404,msg:'invalid input'})
                }
            })
            .catch(function(err){
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