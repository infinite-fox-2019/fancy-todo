module.exports = (err,req,res,next)=>{
    let statusCode = err.status || 500
    let message = err.msg || err
    res.status(statusCode).json({message})
}