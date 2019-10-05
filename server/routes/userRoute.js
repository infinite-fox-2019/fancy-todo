const Route = require('express').Router();
const UserCont = require('../controllers/userController.js');


Route.post('/signinG',UserCont.signinGoogle);

module.exports = Route;