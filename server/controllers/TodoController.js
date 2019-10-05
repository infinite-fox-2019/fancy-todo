class TodoController {
    static findAll(req, res, next) {
        res.status(200).json({findAll: 'findAll'})
    }
}

module.exports = TodoController