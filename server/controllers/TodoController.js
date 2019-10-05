class TodoController {
    static findAll(req, res, next) {
        res.status(200).json({findAll: 'findAll'})
    }

    static create(req, res, next) {
        
    }
}

module.exports = TodoController