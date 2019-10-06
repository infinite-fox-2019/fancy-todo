const Project = require('../models/project')
const User = require('../models/user')
const mongoose = require('mongoose')
const Todo = require('../models/todo')

class projectController {
  static create(req, res, next) {
    let owner = req.decoded._id
    let { name } = req.body
    Project.create({
      name, owner
    }).then(data => {
      res.status(201).json({
        project: data
      })
    }).catch(next)
  }
  static getAll(req, res, next) {
    console.log(req.headers.token);
    let id = req.decoded._id
    console.log(id);
    Project.find({
      $or: [
         { owner: id },
         {
           members : {$in :[id] }
         }
        ]
      })
      .sort({'createdAt': -1})
      .populate({ path: 'owner', select: 'email name' })
      .then(data => {
        console.log(data);
        res.status(200).json(data)


      }).catch(next)
  }
  
  static removeMembers(req, res, next) {
    const { member } = req.body
    Project.findOneAndUpdate({ _id: req.params.projectId },
      { $pull: { members: member } }
    )
      .then(() => {
        res.status(200).json({ message: 'Success remove member' })
      })
  }


  static projectAndTodos(req, res, next) {
    console.log('........');
    Project.findById(req.params.projectId)
      .populate({ path: 'owner', select: 'email name' })
      .populate({ path: 'members', select: 'email name' })
      .then(project => {
        return Todo.find({ project: req.params.projectId })
          .sort({ 'createdAt': -1 })
          .populate({ path: 'user', select: 'email name', options: { sort: { 'name': 1 } } })
          .then(data => {
            console.log(data);
            console.log(project);
            res.status(200).json({
              project: project,
              todos: data
            })
          })
          .catch(err => {
            clg(err)
            next()

          })
      })
  }

  static destroy(req, res, next) {
    Project.deleteOne({ _id: req.params.projectId })
      .then(data => {
        res.status(200).json({
          data
        })
      }).catch(next)
  }

  static addMembers(req, res, next) {
    const { members } = req.body
    Project.findById(req.params.projectId)
      .then(result => {
        members.forEach(el => {
          result.members.push(mongoose.Types.ObjectId(el))
        })
        result.save()
        res.status(200).json({ project: result, newMembers: members })
      })
      .catch(next)
  }


  static allUsers(req, res, next) {
    let id = req.decoded_id
    let listmember = []
    Project.findById(req.params.projectId)
      .then(data => {
        listmember = data.members
        listmember.push(data.owner)
        User.find({}).sort({'name': 1})
          .then(data => {
            let listuser = []
            data.forEach((el, i) => {
              if (!listmember.includes(el._id)) {
                listuser.push(el)
              }
            })
            res.json({ listuser, member: listmember })
          })
      })
      .catch(next)
  }
}

module.exports = projectController;