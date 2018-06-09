var request = require('request')
var promise = require('../models/contentstack')
var config = require('../configuration/constants')


exports.home = function(req, res){
    
    var getHeader = promise.promiseFunction(config.headerUrl())
    var getBody = promise.promiseFunction(config.homeUrl())
    var getFooter = promise.promiseFunction(config.footerUrl())
    var urlArray = [getHeader, getBody, getFooter]
    promise.promiseAll(urlArray, 'home', res)
    
}

exports.getresource = function(req, res){
    return res.send({
        "test":"demo"
    })
}
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
exports.testdemo = function(req, res){
    request.get('http://localhost:3000/test', function(err, resp, body){
            console.log(typeof body)
            var bool= IsJsonString(body)
            console.log(bool)
            if(bool == false){
                res.render('error')
            }
            else{
                res.send(body)
            }
    })

}