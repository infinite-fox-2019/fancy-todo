const Todo = require('../models/todo')
const Project = require('../models/project')

function authorization(req, res, next){
  Todo.findById(req.params.id)
  .then(result =>{
      if (result.user == req.decoded._id){
        next()
      }
      else {
        next({
          status : 401,
          message : 'Unathorized'
        })
      }
  })
  .catch(() =>{
    next({
      status: 404,
      message: 'Not Found'
    })
  })
}

function authzProject(req, res, next){
  Project.findById(req.params.projectId)
  .then(result =>{
    
    console.log(result, '<<<<');
    if (result.owner == req.decoded._id){
        next()
      }
      else {
        next({
          status : 401,
          message : 'Unathorized'
        })
      }
  })
  .catch(() =>{
    next({
      status: 404,
      message: 'Not Found'
    })
  })
}

function authzMember(req, res, next){
  Project.findById(req.params.projectId)
  .then(result =>{
    console.log(result, '????');
    if (result.owner == req.decoded._id){
      next()
    }
    else if (result.members.includes(req.decoded._id)){
      next()
    }
  })
  .catch(next)
}

module.exports = {authorization, authzProject, authzMember}