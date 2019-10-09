const express = require("express")
const router = express.Router()
const {authentication, authorization} = require('../middlewares/auth')
const HolidayController = require("../controllers/holidayController")

router.get('/holiday', authentication, authorization ,HolidayController.getHoliday)
router.post('/holiday', authentication, authorization,HolidayController.searchHoliday)

module.exports = router