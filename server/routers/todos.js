const router = require('express').Router()
const TodoController = require('../controllers/TodoController')

router.get('/', TodoController.findAll)
router.get('/', TodoController.create)

module.exports = router

// kemeja 5 - kemeja kerja 1
// kemeja putih
// kaos rumah 5
// celana rumah h&m
// celana merah
// training biru 
// cd 5