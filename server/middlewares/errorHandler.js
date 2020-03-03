module.exports = (err, req, res, next) => {
  let status = err.status || 500
  let message = err.message || "internal server error"
  // console.log(err)
  if (err.name === "ValidationError") {
    status = 400
    let errArray = []
    // console.log(err.errors)
    for (let el in err.errors) {
      if (err.errors[el].kind === 'unique') {
        errArray.push(`This el is already registered`)
      } else {
        errArray.push(err.errors[el].message)
      }
    }
    message = errArray.join(', ')
  } else if (err.name === "JsonWebTokenError") {
    status = 401
    message = "Fail authentication"
  }
  res.status(status).json({ message })
}