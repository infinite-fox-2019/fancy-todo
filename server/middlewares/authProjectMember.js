'use strict'

const { Project } = require('../models')

module.exports = (req, res, next) => {
  const userId = req.decode.id
  const projectId = req.params.id
  Project.findById(projectId)
    .then((project) => {
      if (project) {
        if (project.members.includes(userId)) {
          next()
        } else {
          const err = new Error('You are not a member of this project')
          err.name = 'AuthorizationError'
          next(err)
        }
      } else {
        const err = new Error('Project does not exist')
        err.name = 'NotFound'
        next(err)
      }
    }).catch(next)
}
