const { verify } = require('../helpers/jwt')
const { ToDo } = require('../models/todo')

module.exports = {

    authentication: (req, res, next) => {
        try {
            const decoded = verify(req.headers.token)
            console.log(decoded);
            req.loggedUser = decoded
            console.log(req.loggedUser);
            next()
        } catch (err) {
            next(err)
        }
    },
    authorization: (req, res, next) => {
        const { id } = req.params
        ToDo.findByPk(id)
            .then(todo => {
                if (todo) {
                    if (todo.UserId === req.loggedUser.id) {
                        next()
                    } else {
                        next({
                            statusCode: 403,
                            msg: 'Authorization failed.'
                        })
                    }
                } else {
                    next({
                        statusCode: 404,
                        msg: `item not found.`
                    })
                }
            })
            .catch(next)
    }
}