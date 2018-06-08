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
    console.log(res.statusCode)
    return res.send({
        fname : "asmit",
        "lname" : "patil"

    })
}

exports.testdemo = function(req, res){
    request.get('http://localhost:3000/test', function(err, resp, body){
        console.log(typeof body)
        res.send(body)
    })

}