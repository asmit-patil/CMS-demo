var express = require('express')
var router = express.Router();

var home = require('../controllers/home_controller')

//home route
router.get('/', home.home)

router.get('/test',home.getresource)

router.get('/testdemo',home.testdemo)

module.exports = router