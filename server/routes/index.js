const routes = require('express').Router();

routes.get('/', ( req , res ) => {
  res.send('test')
})


module.exports = routes