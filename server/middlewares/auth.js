const {verifyToken} = require("../helpers/jwt")
const User = require("../models/user")
const ObjectID = require('mongoose').Types.ObjectId

const authentication = function(req,res,next){
    try{
        let decoded = verifyToken(req.headers.token)
        req.loggedUser = decoded
        // console.log(req.loggedUser)
        next()
    }
    catch {
        throw {
            statusCode : 403,
            msg : "not login"
        }
    }
}

//masih belum kerja sebagaimana mestinya, jika dipaksa melalui routes, user lain masih
//bisa ngotak ngatik konten user satunya

const authorization = function(req,res,next){
    console.log(req.loggedUser.email)
    User.findOne({email:req.loggedUser.email})
    .then(function(data){
        console.log("masuk")
        console.log(data)
        if(!data){
            throw {
                status:404,
                msg: "not found"
            }
        }
        else if(req.loggedUser.email === data.email){
            next()
        }
        else{
            throw{
                status: 401,
                msg: "not authorized"
            }
        }
    })
    .catch(next)
}

const authorization2 = function(req,res,next){
    console.log(req.body._id)
    User.findOne({email:req.loggedUser.email}, {},{ todoList: {_id:ObjectID(`${req.body._id}`)} })
    .then(function(data){
        console.log(data)
        if(!data){
            throw {
                status: 401,
                msg: "not authorized"
            }
        }
        else{
            next()
        }
    })
    .catch(next)
}


module.exports = {authentication, authorization, authorization2}