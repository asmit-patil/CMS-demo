

var promise = require('../utilities/promiseUtility')
var config = require('../configuration/config')

exports.contactus = function(req, res, next){
    
    var getHeader = promise.promiseFunction(config.headerUrl())
    var getBody = promise.promiseFunction(config.contactUsUrl())
    var getFooter = promise.promiseFunction(config.footerUrl())
    var urlArray = [getHeader, getBody, getFooter]
    promise.promiseAll(urlArray, 'contactus', res)
}
