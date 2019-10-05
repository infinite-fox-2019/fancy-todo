const Route = require('express').Router();
const Todo = require('./todoRoute');
const User = require('./userRoute');


Route.use('/todos',Todo);
Route.use('/users',User);

module.exports = Route;