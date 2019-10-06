const Route = require('express').Router();
const UserCont = require('../controllers/userController.js');

Route.post('/signin',UserCont.signinDefault);
Route.post('/signinG',UserCont.signinGoogle);
Route.post('/signup',UserCont.register);
Route.post('/signintoken',UserCont.signinToken);

module.exports = Route;