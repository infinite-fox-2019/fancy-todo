const Route = require('express').Router();
const TodoCont = require('../controllers/todoController');

Route.post('/create',TodoCont.create);

module.exports = Route;