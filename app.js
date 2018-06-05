
var express = require('express')
var app = express()
var nunjucks  = require('nunjucks');
const port = process.env.PORT || 8000;
app.use('/public', express.static('public'))
app.set('view engine', 'html')
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//var Promise = require('bluebird');
var request = require('request')

nunjucks.configure('views', {
    autoescape: false,
    express   : app
  });

// var urlList=[];
// function getBodies(array) {
//     return Promise.map(urlList, function(url) {
//         return request.getAsync(url).spread(function(response,body) {
//             return JSON.parse(body);
//         });
//     });
// }
var urlstart ="https://cdn.contentstack.io/v3/content_types/"
var urlend="/entries?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true"
var headerurl= urlstart+"header"+urlend
var homeurl= urlstart+"home"+urlend
var footerurl= urlstart+"footer"+urlend
var faqurl= urlstart+"faq"+urlend
var contactusurl =urlstart+"contact_us"+urlend

var pf=function (url){

   return new Promise(function(resolve, reject) {
        request.get( options = {  
            url: url,
            method: 'GET'  
        }, function(err, resp, body) {
            if (err) {
               return reject(err);
            } else {
                return resolve(JSON.parse(body));
            }
        })
        
    })
}

app.get('/',function(req,res,next){
    getHeader=pf(headerurl)
    getBody=pf(homeurl)
    getFooter=pf(footerurl)
    Promise.all([getHeader,getBody,getFooter])
        .then(function(values) 
        {
            console.log(values);
            res.render('home',{
                    data:values
            })
        })
        .catch(function(err){
            console.log(err)
        })   
})


app.get('/faq',function(req,res,next){
    getHeader=pf(headerurl)
    getBody=pf(faqurl)
    getFooter=pf(footerurl)
    Promise.all([getHeader,getBody,getFooter])
        .then(function(values) 
        {
            console.log(values);
            res.render('faq',{
                    data:values
            })
        })
        .catch(function(err){
            console.log(err)
        })
})

  
app.get('/contactus',function(req,res,next){
    
//    urlList=[headerurl,contactusurl,footerurl]
//     getBodies(urlList).then(function(results) {
//         console.log(results)
//         res.render('contactus',{
//             data:results
//         })
        
//     }).catch(function(err) {
//         console.log(err)
//     });
    getHeader=pf(headerurl)
    getBody=pf(contactusurl)
    getFooter=pf(footerurl)
    Promise.all([getHeader,getBody,getFooter])
        .then(function(values) 
        {
            console.log(values);
            res.render('contactus',{
                    data:values
            })
        })
        .catch(function(err){
            console.log(err)
        })

})
app.listen(port, function(){
    console.log(`Server running at port ${port}: http://localhost:${port}`)
})
