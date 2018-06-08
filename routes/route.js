var express = require('express')
var router = express.Router();

var home = require('../controller/home_controller')
var faq = require('../controller/faq_controller')
var contactus = require('../controller/contactus_controller')

//home route
router.get('/', home.home)
//faq route
router.get('/faq', faq.faq)
//contactus route
router.get('/contactus', contactus.contactus)

//demo route
router.get('/test', home.getresource)
//testdemo route
router.get('/testdemo', home.testdemo)

module.exports = router