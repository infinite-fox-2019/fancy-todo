module.exports = (err,req,res,next) => {
    console.log('masuk error handler')
    console.log(err)

    if(err.name === 'ValidationError'){
        res.status(422).json({err: err.message})    
    }else if(err.name === 'loginError'){
        res.status(403).json({err: err.msg})
    }else if(err.name === 'authenticationError'){
        res.status(401).json({err: err.msg})
    }else if(err.name === 'authorizationError'){
        res.status(403).json({err: err.msg})
    }

    else{
        console.log(err)
        res.status(500).json(err)
    }

}
