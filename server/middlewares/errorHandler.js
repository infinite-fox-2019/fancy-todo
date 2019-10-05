module.exports = (err, req, res, next) => {
    let status = err.status || 500
    let message = err.message || `INTERNAL ERROR SERVER`

    console.log(err)
    res.status(status).json({ message })
}