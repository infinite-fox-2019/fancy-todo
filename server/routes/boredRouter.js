const router = require('express').Router()
const BoredController = require('../controllers/boredController')

router.get('/',BoredController.search)

module.exports =router