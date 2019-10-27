const Project = require('../models/project')
const Todo = require('../models/todo')
const User = require('../models/user')

class ProjectController {
  static findProject(req,res,next){
    const {_id} = req.params
    Project.findOne({_id})
      .then(data => {
        if(data){
          res.status(200).json(data)
        }
        else{
          throw {message:"Project not found", status: 404}
        }
      })
      .catch(next)
  }

  static listTodoInProject(req,res,next){
    const {_id} = req.params // ProjectId
    Project.findOne({_id})
    .populate('TodoId')
    .then(data => {
      if(data){
        res.status(200).json(data)
      }
      else{
        throw {message:"Data not found", status:404}
      }
    })
    .catch(next)
  }

  static createProject(req,res,next){
    const OwnerId = req.loggedUser._id
    const {projectName} = req.body
    Project.create({OwnerId,projectName})
      .then(data => {
        res.status(201).json(data)
      })
      .catch(next)
  }

  static addTodoProject(req,res,next){
    const {title, description} = req.body
    const {_id} = req.params // ProjectId
    Todo.create({title,description,ProjectId:_id})
      .then(data => {
        return Project.updateOne({_id},{$push:{TodoId:data._id}})
      })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(next)
  }

  static addUserProject(req,res,next){
    const {email} = req.body
    const {_id} = req.params // ProjectId
    User.findOne({email})
      .then(data => {
        if(data){
          Promise.all([
            User.updateOne({_id:data._id}, {$push:{ProjectId:_id}}),
            Project.updateOne({_id}, {push:{UserId:data._id}})
          ])
        }
        else{
          throw {message:"User not found", status: 404}
        }
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }
}

module.exports = ProjectController