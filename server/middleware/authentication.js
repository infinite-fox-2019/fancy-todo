
const { verifyUser } = require('../helpers/jwt')

module.exports = (req, res, next) => {
    try {
        req.decode = verifyUser(req.headers.token)
        next()
    } catch (err) {
        next(err)
    }
}
    