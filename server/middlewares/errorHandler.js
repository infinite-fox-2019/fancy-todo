module.exports = (err, req, res, next) => {
    console.log(err)
    let strMessage = ''
    for(let field in err.errors) {
        let message = err.errors[field].message
        strMessage += message + '\n\n'
    }
    if(strMessage !== '') {
        err.status = 400
        err.title = 'Invalid Input'
        err.msg = strMessage
    }
    // let castError = false
    // if(err.name === 'ValidationError') {
    //     let strMessage = ''
    //     for(let field in err.errors) {
    //         let message = err.errors[field].message
    //         if(message.substring(0, 12) === 'Cast to Date') {
    //             castError = true
    //         }
    //         if(message)
    //         strMessage += message + '\n\n'
    //     }
    //     err.status = 400
    //     err.title = 'Invalid Input'
    //     err.msg = strMessage
    // } else if(err.name === 'CastError') {
    //     castError = true
    // }
    // if(castError) {
    //     err.status = 400
    //     err.title = 'Invalid Input'
    //     err.msg = 'Wrong date format'
    // }
    res.status(err.status || 500).json({title: err.title || 'Server Error', message: err.msg || 'Something wrong with the server. Please try again later.'})
}