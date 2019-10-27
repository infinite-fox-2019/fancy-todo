const router = require('express').Router()
const UserControlles = require('../controllers/userController')

router.post('/login', UserControlles.login)
router.post('/register', UserControlles.register)

module.exports = router