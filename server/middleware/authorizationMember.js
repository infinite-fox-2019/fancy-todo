const Project = require('../models/Project')

module.exports = (req, res, next) => {
    const projectId = req.params.projectId
    const userId = req.decode.id
    Project.findById(projectId)
        .then((Project) => {
            if (Project) {
                console.log(Project)
                if (Project.members.includes(userId)) {
                    next()
                } else {
                    let err = new Error('You are not a member of this Project')
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