const Project = require('../models/Project')

module.exports = (req, res, next) => {
    const ProjectId = req.params.ProjectId
    const userId = req.decode.id
    Project.findById(ProjectId)
        .then((Project) => {
            if (Project) {
                if (Project.owner == userId) {
                    next()
                } else {
                    let err = new Error('You have no authorization on this Project')
                    err.name = 'AuthorizationError'
                    next(err)
                }
            } else {
                let err = new Error('Project does not exist')
                err.name = 'NotFound'
                next(err)
            }
        }).catch(next);
}