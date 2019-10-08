const Todo = require('../models/todo')

function authorized(req, res, next) {
    if(req.LoggedUser) {
        try {
            Todo.findById(req.params.id)
                .then(task => {
                    if(req.LoggedUser.name == task.author) {
                        next()
                    } else {
                        res.status(401).json({
                            message: 'Validation Error: Users exclusive feature'
                        })
                    }
                })
                .catch(err => {
                    res.status(500).json(err)
                })
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(400).json({
            message: 'Token not found'
        })
    }
}

module.exports = authorized