var request = require('request')
var promise = require('../utilities/promiseUtility')
var config = require('../configuration/config')


exports.home = function(req, res){
    
    var getHeader = promise.promiseFunction(config.headerUrl())
    var getBody = promise.promiseFunction(config.homeUrl())
    var getFooter = promise.promiseFunction(config.footerUrl())
    var urlArray = [getHeader, getBody, getFooter]
    promise.promiseAll(urlArray, 'home', res)
    
}

exports.getresource = function(req, res){
    return res.send("test")
}

exports.testdemo = function(req, res){
    request.get('http://localhost:3000/test', function(err, resp, body){
        console.log(typeof body)
        var e = JSON.parse(body)
        res.send(e)
    })

}