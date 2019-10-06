const router = require('express').Router()
const UserControllers = require('../controllers/user')

router.get('/:username', UserControllers.findUser)
router.post('/register', UserControllers.register)
router.post('/login', UserControllers.login)
router.post('/gsignin', UserControllers.googleSignIn)
router.patch('/update/name', UserControllers.changeName)

module.exports = router