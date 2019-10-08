const jwt = require('jsonwebtoken')

function isLogin(req, res, next) {
    if(req.headers.hasOwnProperty('token')) {
        try {
            const decodedToken = jwt.verify(req.headers.token, process.env.SECRET)
            if (decodedToken.email) {
                req.LoggedUser = decodedToken
                next()
            }   
        }
        catch(err) {
            res.status(500).json({msg: `${err} (Internal Server Error)`})
        }
    } else {
        res.status(403).json({msg: `(Forbidden)`})
    }
    
}

module.exports = isLogin