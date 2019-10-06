const router = require("express").Router()
const todoRoutes = require("./todoRoutes")
const userRoutes = require("./userRoutes")
const holidayRoutes = require("./holidayRoutes")

router.use('/user',userRoutes)
router.use('/todo',todoRoutes)
router.use('/api',holidayRoutes)

module.exports = router