const User = require('../models/user')
const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')

class UserController {

    static register(req,res,next){
        const {username,email,password} = req.body
        const user = {
            username,
            email,
            password
        }
        User.create(user).then(user=>{
            const payload = {
                id : user._id,
                username : user.username
            }
            const token = generateToken(payload)
            res.status(201).json({
                user,
                token
            })
        })
        .catch(next)
    }

    static login(req,res,next){
        User.findOne({username : req.body.username}).then(user=>{
            if (user){
                if (comparePassword(req.body.password,user.password)){
                    const payload = {
                        id : user._id,
                        username : user.username
                    }
                    const token = generateToken(payload)
                    res.status(201).json({
                        token
                    })
                } else {
                    throw {
                        name : 'NotFound',
                        customMessage : 'wrong password/username'
                    }
                }
            } else {
                throw {
                    name : 'NotFound',
                    customMessage : 'wrong password/username'
                }
            }
        })
        .catch(next)
    }

    static read(req,res,next){
        User.find().then(users=>{
            res.status(200).json({
                users
            })
        })
        .catch(console.log)
    }

    static find(req,res,next){
        User.findById(req.query.id).then(user=>{
            res.status(200).json(user)
        })
        .catch(console.log)
    }

    static delete(req,res,next){
        User.findByIdAndDelete(req.params.id).then(deletedUser=>{
            if(deletedUser){
                res.status(200).json({
                    user : deletedUser
                })
            } else {
                throw {
                    name : 'NotFound'
                }
            }
        })
        .catch(next)
    }

    static update(req,res,next){
        const {username,email} = req.body
        const update = {
            username,
            email
        }
        User.findByIdAndUpdate(req.params.id,update,{omitUndefined : true, new : true, runValidators : true})
        .then(updatedUser=>{
            res.status(200).json({
                user : updatedUser
            })
        })
        .catch(next)
    }
}

module.exports = UserController