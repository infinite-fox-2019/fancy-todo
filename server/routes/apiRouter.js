const router = require('express').Router();
const ApiController = require('../controllers/apiController')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.get('/', ApiController.randomJoke)

module.exports = router