var express = require('express')
var router = express.Router();

var contactus = require('../controllers/contactus_controller')

//contactus route
router.get('/', contactus.contactus)

module.exports = router