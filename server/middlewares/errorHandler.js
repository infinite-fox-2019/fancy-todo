function errorHandler(err,req,res,next){
    switch(err.name){
        case 'ValidationError' :
            let arr = []
            for (const key in err.errors) { arr.push(err.errors[key].message) }
            res.status(400).json({
                msg : arr
            })
            break;
        case 'CastError' :
            res.status(404).json({
                msg : err.customMessage || 'specified item is not found'
            })
            break;
        case 'RequestError' :
            res.status(400).json({
                msg : err.customMessage || 'Illegal argument'
            })
            break;
        case 'NotFound' :
            res.status(404).json({
                msg : err.customMessage || 'specified item is not found'
            })
            break;
        case 'Unauthorized' :
            res.status(401).json({
                msg : err.customMessage || 'Unauthorized'
            })
            break;
        case 'JsonWebTokenError' :
            res.status(400).json({
                msg : err.message
            })
            break;
        default :
        console.log(err)
            res.status(500).json({
                error : err,
                message : 'default error'
            })
            break;
    }   
}

module.exports = errorHandler