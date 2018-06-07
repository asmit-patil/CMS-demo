var express = require('express')
var app = express()
var request = require('request')
var config = require('../configuration/config.js')
nunjucks = require('nunjucks')
// var urlList=[]
// function getBodies(array) {
//     return Promise.map(urlList, function(url) {
//         return request.getAsync(url).spread(function(response,body) {
//             return JSON.parse(body)
//         })
//     })
// }
// setting view and configuring nunjucks
app.set('view engine', 'html')
nunjucks.configure('views', {
    autoescape : false,
    express   : app
  })
var headerUrl = config.url.urlStart + "header" + config.url.urlEnd
var homeUrl = config.url.urlStart + "home" + config.url.urlEnd
var footerUrl = config.url.urlStart + "footer" + config.url.urlEnd
var faqUrl = config.url.urlStart + "faq" + config.url.urlEnd
var contactUsUrl = config.url.urlStart + "contact_us" + config.url.urlEnd

var promiseFunction = function (url){
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
               // error.resp = resp
                throw error
            }
        })
        
    })
}
var promiseAll = function(urlArray, viewName, res){
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

app.get('/', function(req, res, next){
    getHeader = promiseFunction(headerUrl)
    getBody = promiseFunction(homeUrl)
    getFooter = promiseFunction(footerUrl)
    var urlArray = [getHeader, getBody, getFooter]
    promiseAll(urlArray, 'home', res)
    // Promise.all([getHeader, getBody, getFooter])
    //     .then(function(values) 
    //     {   
    //         var data
    //         console.log( values, "fdgggggggggggggggggg")
    //         res.render('home', {
    //                 data:values
    //         })
    //     })
    //     .catch(function(err){
    //         console.log(err)
    //     })   
})


app.get('/faq', function(req, res, next){
    getHeader = promiseFunction(headerUrl)
    getBody = promiseFunction(faqUrl)
    getFooter = promiseFunction(footerUrl)
    var urlArray = [getHeader, getBody, getFooter]
    promiseAll(urlArray, 'faq', res)
})

  
app.get('/contactus', function(req, res, next){
    
//    urlList=[headerurl,contactusurl,footerurl]
//     getBodies(urlList).then(function(results) {
//         console.log(results)
//         res.render('contactus',{
//             data:results
//         })
        
//     }).catch(function(err) {
//         console.log(err)
//     });
    getHeader = promiseFunction(headerUrl)
    getBody = promiseFunction(contactUsUrl)
    getFooter = promiseFunction(footerUrl)
    var urlArray = [getHeader, getBody, getFooter]
    promiseAll(urlArray, 'contactus', res)
})

module.exports = app