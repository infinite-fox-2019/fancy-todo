module.exports = function(err,req,res,next) {
    let statusCode = err.status || 500;
    let msg = err.msg || 'Internal Server Error';

    res.status(statusCode,msg)
}