const Route = require('express').Router();
const Animal = require('../controllers/animalController');

Route.get('/',Animal.showAnimal);

module.exports = Route;