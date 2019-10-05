const Route = require('express').Router();
const TodoCont = require('../controllers/todoController');

Route.get('/',TodoCont.hello);

module.exports = Route;