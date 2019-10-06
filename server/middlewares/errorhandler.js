module.exports = function(err,req,res,next){
    console.log(err)
    let statusCode = err.status || 500
    let message = err.msg || err.message
    res.status(statusCode).json({message})
}