const router = require('express').Router()
const TaskController = require('../controllers/TaskController')
const {authentication} = require('../middlewares/auth')

router.use(authentication)
router.get('/', TaskController.findAll)
router.post('/create', TaskController.create)

module.exports = router

// kemeja 5 - kemeja kerja 1
// kemeja putih
// kaos rumah 5
// celana rumah h&m
// celana merah
// training biru 
// cd 5