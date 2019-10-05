module.exports = (err, req, res, next) => {
    console.log(err.name)
    if(err.name === 'ValidationError') {
        let strMessage = ''
        for(let field in err.errors) {
            strMessage += err.errors[field].message + '\n\n'
        }
        err.status = 400
        err.title = 'Invalid Input'
        err.msg = strMessage
    }
    res.status(err.status || 500).json({title: err.title || 'Server Error', message: err.msg || 'Something wrong with the server. Please try again later.'})
}