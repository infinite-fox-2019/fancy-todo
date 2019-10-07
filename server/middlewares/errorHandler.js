module.exports =
    (err, req, res, next) => {
        const statusCode = err.status || 500
        const errorMessage = err.msg || 'Internal Server Error'
        res.status(statusCode).json({msg: errorMessage})
    }