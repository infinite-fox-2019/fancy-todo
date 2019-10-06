const { verifyedToken } = require('../helpers/jwt')
const Todos = require('../models/todo')


function authentication(req, res, next){
    try{
        // console.log(req.headers.token);
        let decodeToken = verifyedToken(req.headers.token)
        req.logedUser = decodeToken
        next()
    }
    catch{
        res.status(500).json('You are not Authentication!')
    }
}

function authorization(req, res, next){
    let {_id} = req.logedUser
    let idTodo = req.params.id
    Todos.findById({ _id: idTodo })
    .then(todo => {
        if(todo.userId == _id){
            next()
        } else {
            res.status(500).json('You are not Authorized!')
        }
    })
    .catch(next)
}



module.exports = { authentication, authorization}