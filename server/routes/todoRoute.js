const Route = require('express').Router();
const TodoCont = require('../controllers/todoController');
const {Authentication} = require('../middleware/auth');

Route.use(Authentication)

Route.post('/',TodoCont.create);
Route.put('/',TodoCont.updateStatus);
Route.delete('/',TodoCont.deleteTodo);
Route.put('/upload',TodoCont.uploadPhoto);

module.exports = Route;