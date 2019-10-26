const Router = require('express').Router(),
    api = require('../controllers/api')

Router.get('/quotes', api.quote)

module.exports = Router;