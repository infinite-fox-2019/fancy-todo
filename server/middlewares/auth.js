const { verify } = require('../helpers/jwt')
const { ToDo } = require('../models/todo')

module.exports = {

    authentication: (req, res, next) => {
        try {
            let decodedToken = verify(req.headers.access_token)
            req.loggedUser = decodedToken

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