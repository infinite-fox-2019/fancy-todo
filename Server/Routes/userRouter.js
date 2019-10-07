const router = require('express').Router();
const userController = require('../Controllers/userController')


router.get('/', userController.readAll)
router.post('/', userController.createUser);
router.post('/login', userController.userLogin)
router.post('/gsignin', userController.googleLogin)
module.exports = router;