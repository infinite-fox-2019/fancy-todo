'use strict'

const { Project, Todo, User } = require('../models')
const mongoose = require('mongoose')

class ProjectController {
  static createProject(req, res, next) {
    const ownerId = req.decode.id
    const { name } = req.body
    Project.create({ name, owner: ownerId })
      .then((project) => {
        res.status(201).json(project)
      }).catch(next)
  }

  static getAllProject(req, res, next) {
    const userId = req.decode.id
    Project.find({ members: mongoose.Types.ObjectId(userId) })
      .then((projects) => {
        res.status(200).json(projects)
      }).catch(next)
  }

  static getOneProject(req, res, next) {
    const projectId = req.params.id
    Project.findById(projectId)
      .populate('todos')
      .populate('members', '-password')
      .then((project) => {
        res.status(200).json(project)
      }).catch(next)
  }

  static deleteProject(req, res, next) {
    const projectId = req.params.id
    Project.findById(projectId)
      .then((project) => {
        if (!project) {
          next({ status: 404, message: 'Project could not be found!' })
        } else {
          return Project.findByIdAndDelete(projectId)
        }
      })
      .then(result => {
        return Todo.deleteMany({ ProjectId: projectId })
      })
      .then(projectDeleted => {
        res.status(200).json({ message: `Project with ID ${projectId} is successfully deleted` })
      })
      .catch(next)
  }

  status
}

module.exports = ProjectController
