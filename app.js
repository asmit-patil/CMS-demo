
var express = require('express')
var app = express()
var nunjucks  = require('nunjucks');
const port = process.env.PORT || 8000;
app.use('/public', express.static('public'))
app.set('view engine', 'html')
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'), {multiArgs: true});

nunjucks.configure('views', {
    autoescape: false,
    express   : app
  });

var urlList=[];
function getBodies(array) {
    return Promise.map(urlList, function(url) {
        return request.getAsync(url).spread(function(response,body) {
            return JSON.parse(body);
        });
    });
}
var urlstart ="https://cdn.contentstack.io/v3/content_types/"
var urlend="/entries?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true"
var headerurl= urlstart+"header"+urlend
var homeurl= urlstart+"home"+urlend
var footerurl= urlstart+"footer"+urlend
var faqurl= urlstart+"faq"+urlend
var contactusurl =urlstart+"contact_us"+urlend

app.get('/',function(req,res,next){

    var getHeader = new Promise(function(resolve, reject) {
       
        console.log(headerurl)
        request.get( options = {  
            url: headerurl,
           
            method: 'GET'
            
        }, function(err, resp, body) {
          
            if (err) {
                console.log(1)
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
        
    })
    
    var getBody= new Promise(function( resolve,reject){
        
        console.log(homeurl)
        request.get( options = {  
            url:homeurl, 
            
            method: 'GET'
            
        },function(err, resp,body){
            if (err) {
                console.log(2)
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    })

    var getFooter = new Promise(function( resolve,reject){
        
        console.log(footerurl)
        request.get( options = {  
            url: footerurl,
           
            method: 'GET'
            
        },function(err, resp,body){
            if (err) {
                console.log(3)
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    })
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
    // promiseFunction.then(function (result){
    //     console.log(result)
    //     res.render('home',{
    //         data:result
    //     })
    // }).catch(function(err){
    //     console.log(err)
    // })
    
    
})


app.get('/faq',function(req,res,next){

urlList=[headerurl,faqurl,footerurl]
console.log(urlList)
    getBodies(urlList).then(function(results) {
        
        console.log(results)
       
        res.render('faq',{
            data:results
        })
        
    }).catch(function(err) {
        console.log(err)
    });
})

  
app.get('/contactus',function(req,res,next){
    
   urlList=[headerurl,contactusurl,footerurl]
    getBodies(urlList).then(function(results) {
        console.log(results)
        res.render('contactus',{
            data:results
        })
        
    }).catch(function(err) {
        console.log(err)
    });


})
app.listen(port, function(){
    console.log(`Server running at port ${port}: http://localhost:${port}`)
})
