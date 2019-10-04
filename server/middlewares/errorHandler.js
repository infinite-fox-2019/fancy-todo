module.exports = (err, req, res, next) => {
    console.log(`
    =============ERROR============
    ${err}
    ==============================
    `)

    let status
    let message

    if (err.name === 'ValidationError') {
        status = 400
        const arr = []
        for (const key in err.errors) {
            arr.push(err.errors[key].message)
        }
        message = arr
    } else {
        status = err.status || 500
        message = err.message || 'Internal Server Error'
    }
    res.status(status).json(message)
}