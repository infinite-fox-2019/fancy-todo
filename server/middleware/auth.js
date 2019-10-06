const jwt = require('jsonwebtoken')
const User = require('../models/user');


function Authentication (req,res,next){
    try {
        const decodeToken = jwt.decode(req.headers.token);
        req.loggedUser = decodeToken;
        next();
    }
    catch{
        next({status:403,msg:'Authentication error'});
    }
}

// function Authorization (req,res,next){
//     User.find({
//         email : req.body.email
//     })
//         .then(function(user){
//             if(req.loggedUser.email === user.email){
//                 next();
//             }else{
//                 next({status:403,msg:'Authorization error'});
//             }
//         })
// }


module.exports ={
    Authentication
}