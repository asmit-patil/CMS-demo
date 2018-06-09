var express = require('express')
var router = express.Router();

var faq = require('../controllers/faq_controller')

//faq route
router.get('/', faq.faq)


module.exports = router