const express = require('express');
const googleController = require('../controllers/google')
const router = express.Router();

router.post('/gsignin', googleController.gsignin)

module.exports = router;