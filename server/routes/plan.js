const PlanController = require('../controllers/plan')
const express = require('express')
const authentication = require('../middlewares/authentication')
const { planAuthorization } = require('../middlewares/authorization')
const router = express.Router()

router.post('/',authentication,PlanController.create)

router.get('/',authentication,PlanController.read)

router.get('/search',PlanController.find)

router.delete('/:id',authentication,planAuthorization,PlanController.delete)

router.patch('/:id',authentication,planAuthorization,PlanController.update)

module.exports = router