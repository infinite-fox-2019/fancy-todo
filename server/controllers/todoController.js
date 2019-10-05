const Todo = require('../models/todo');

class TodoController {
    static hello(req,res){
        res.send('masuk todo')
    }
}


module.exports = TodoController;