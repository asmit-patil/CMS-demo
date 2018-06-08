var request = require('request')
var promise = 
{
    promiseFunction : function (url){
        return new Promise(function(resolve, reject) {
                request.get( options = {  
                        url: url  
        }, function(err, resp, body) {
        console.log(resp.statusCode,"______________status code")
        if (err) {
            return reject(err)
        }else if (resp.statusCode >= 200 && resp.statusCode < 300) {
             console.log(typeof body,"_____________body type")
             return resolve(JSON.parse(body))
        } else {
             var error = new Error(resp.statusText)
             throw error
        }
        })     
    })
    },
    promiseAll : function(urlArray, viewName, res){
        Promise.all(urlArray)
            .then(function(values) 
            {   
                var data
                console.log( values, "______________result")
                res.render(viewName, {
                        data : values
                })
            })
            .catch(function(err){
                console.log(err)
            })   
    }

}
module.exports = promise