const ItineraryController = require('../controllers/itinerary')
const express = require('express')
const authentication = require('../middlewares/authentication')
const { itineraryAuthorization } = require('../middlewares/authorization')
const router = express.Router()

router.post('/',authentication,ItineraryController.create)

router.get('/',authentication,ItineraryController.read)

router.patch('/:id',authentication,itineraryAuthorization,ItineraryController.update)

router.patch('/:id/participant',authentication,itineraryAuthorization,ItineraryController.addParticipant)

router.delete('/:id/participant',authentication,itineraryAuthorization,ItineraryController.deleteParticipant)

router.patch('/:id/plan',authentication,itineraryAuthorization,ItineraryController.addPlan)

router.delete('/:id/plan',authentication,itineraryAuthorization,ItineraryController.deletePlan)

router.get('/search',ItineraryController.findByOwner)

router.delete('/:id',authentication,itineraryAuthorization,ItineraryController.delete)

module.exports = router