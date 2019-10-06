const Route = require('express').Router();
const Todo = require('./todoRoute');
const User = require('./userRoute');
const Animal = require('./animalRoute');


Route.use('/todos',Todo);
Route.use('/users',User);
Route.use('/animals',Animal);

module.exports = Route;