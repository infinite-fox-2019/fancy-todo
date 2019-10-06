const Route = require('express').Router();
const TodoCont = require('../controllers/todoController');

Route.post('/',TodoCont.create);
Route.put('/',TodoCont.updateStatus);
Route.delete('/',TodoCont.deleteTodo);

module.exports = Route;