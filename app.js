
var express = require('express')
var app = express()
var nunjucks  = require('nunjucks')
var request = require('request')

const port = process.env.PORT || 8000
app.use(express.static(__dirname + '/public'))
console.log(__dirname)
//app.use('/public', express.static('public'))
app.set('view engine', 'html')


nunjucks.configure('views', {
    express   : app
  })

// var urlList=[];
// function getBodies(array) {
//     return Promise.map(urlList, function(url) {
//         return request.getAsync(url).spread(function(response,body) {
//             return JSON.parse(body);
//         });
//     });
// }
var urlstart = "https://cdn.contentstack.io/v3/content_types/"
var urlend = "/entries?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true"
var headerurl = urlstart + "header" + urlend
var homeurl = urlstart + "home" + urlend
var footerurl = urlstart + "footer" + urlend
var faqurl = urlstart + "faq" + urlend
var contactusurl = urlstart + "contact_us" + urlend

var promiseFunction = function (url){

   return new Promise(function(resolve, reject) {
        request.get( options = {  
            url: url  
        }, function(err, resp, body) {
            if (err) {
               return reject(err)
            } else {
                console.log(typeof body)
                return resolve(JSON.parse(body))
            }
        })
        
    })
}
var callingPromiseAll=function(urlArray,viewname,res){
    Promise.all(urlArray)
        .then(function(values) 
        {   
            var data
            console.log( values, "fdgggggggggggggggggg");
            res.render(viewname, {
                    data:values
            })
        })
        .catch(function(err){
            console.log(err)
        })   
}

app.get('/', function(req,res,next){
    getHeader = promiseFunction(headerurl)
    getBody = promiseFunction(homeurl)
    getFooter = promiseFunction(footerurl)
    var urlArray=[getHeader, getBody, getFooter]
    callingPromiseAll(urlArray,'home',res)
    // Promise.all([getHeader, getBody, getFooter])
    //     .then(function(values) 
    //     {   
    //         var data
    //         console.log( values, "fdgggggggggggggggggg");
    //         res.render('home', {
    //                 data:values
    //         })
    //     })
    //     .catch(function(err){
    //         console.log(err)
    //     })   
})


app.get('/faq', function(req, res, next){
    getHeader = promiseFunction(headerurl)
    getBody = promiseFunction(faqurl)
    getFooter = promiseFunction(footerurl)
    var urlArray=[getHeader, getBody, getFooter]
    callingPromiseAll(urlArray,'faq',res)
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
    getHeader = promiseFunction(headerurl)
    getBody = promiseFunction(contactusurl)
    getFooter = promiseFunction(footerurl)
    var urlArray=[getHeader, getBody, getFooter]
    callingPromiseAll(urlArray,'contacus',res)
})
app.listen(port, function(){
    console.log(`Server running at port ${port}: http://localhost:${port}`)
})
