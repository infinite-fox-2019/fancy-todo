module.exports = (err, req, res, next) => {
    console.log(err)
    if(err.name === 'ValidationError') {
        let strMessage = ''
        let dateError = false
        for(let field in err.errors) {
            let message = err.errors[field].message
            if(message.substring(0, 12) === 'Cast to Date') {
                dateError = true
            }
            strMessage += message + '\n\n'
        }
        err.status = 400
        err.title = 'Invalid Input'
        err.msg = strMessage
        if(dateError) {
            err.msg = 'Wrong date format'
        }
    }
    res.status(err.status || 500).json({title: err.title || 'Server Error', message: err.msg || 'Something wrong with the server. Please try again later.'})
}