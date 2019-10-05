const {OAuth2Client} = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {hashPassword} = require('../helpers/hashPassword');

let dummyUsername = ''
for(let i=0;i<10;i++){
    let secretDummy = process.env.DUMMY_USERNAME
    let key = secretDummy;
    let rand = Math.round(Math.random() * key.length)
    dummyUsername += key[rand];
}

class UserController {
    static signinGoogle(req,res,next){
        // let email = ''
        // const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        // client.verifyIdToken({
        //     idToken : req.body.id_token,
        //     audience : process.env.GOOGLE_CLIENT_ID
        // })
        // .then(function(ticket){
        //     const payload = ticket.getPayload() //get username,email dari google
        //     email = payload.email;
        //     let serverToken = jwt.sign(payload,process.env.JWT_SECRET);
        //     res.status(200).json(serverToken);
        // })
        // .catch(console.log)

        // User.create({
        //     username : dummyUsername,
        //     password : dummyUsername,
        //     email : payload.email
        // })
        // .then(function(success){
        //     // console.log(serverToken)
        //     console.log('Data Berhasil DiSimpan')
        // })
        User.create({
            username : req.body.username,
            password : req.body.password,
            email : req.body.email
        })
        .then(function(success){
            console.log('Data Berhasil DiSimpan')
            res.status(201).json('success create')
        })
        .catch(function(err){
            next(err)
        })
    }
}


module.exports = UserController;