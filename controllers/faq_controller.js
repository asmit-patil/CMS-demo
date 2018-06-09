
var promise = require('../models/contentstack')
var config = require('../configuration/constants')

exports.faq = function(req, res, next){
    
    var getHeader = promise.promiseFunction(config.headerUrl())
    var getBody = promise.promiseFunction(config.faqUrl())
    var getFooter = promise.promiseFunction(config.footerUrl())
    var urlArray = [getHeader, getBody, getFooter]
    promise.promiseAll(urlArray, 'faq', res)
}

