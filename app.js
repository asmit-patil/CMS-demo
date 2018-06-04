
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
var urlend="?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true"





app.get('/',function(req,res,next){
   
   
    
    var getHeader = new Promise(function(resolve, reject) {
        
        request.get( options = {  
            uri: 'https://cdn.contentstack.io/v3/content_types/header/entries/bltb486361a97a80102?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true',
            method: 'GET'
            
        }, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
        
    })
    
    var getBody= new Promise(function( resolve,reject){
        request.get( options = {  
            uri: 'https://cdn.contentstack.io/v3/content_types/home/entries/blt18ca953908cad013?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true',
            method: 'GET'
            
        },function(err, resp,body){
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    })

    var getFooter = new Promise(function( resolve,reject){
        request.get( options = {  
            uri: 'https://cdn.contentstack.io/v3/content_types/footer/entries/blt18fe59745b5ecd54?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true',
            method: 'GET'
            
        },function(err, resp,body){
            if (err) {
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
    
      

//  urlList=["https://cdn.contentstack.io/v3/content_types/header/entries/bltb486361a97a80102?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true","https://cdn.contentstack.io/v3/content_types/home/entries/blt18ca953908cad013?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true","https://cdn.contentstack.io/v3/content_types/footer/entries/blt18fe59745b5ecd54?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true"]
    

    
//     getBodies(urlList).then(function(results) {
//         console.log(results)
//         res.render('home',{
//             data:results
//         })
        
//     }).catch(function(err) {
//         console.log(err)
//     });
})

//footer url ---------> https://cdn.contentstack.io/v3/content_types/footer/entries/blt18fe59745b5ecd54?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true
//header url---------> https://cdn.contentstack.io/v3/content_types/header/entries/bltb486361a97a80102?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true
//contctus url--------->https://cdn.contentstack.io/v3/content_types/contact_us/entries/blt5a15df9d932ed508?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true


app.get('/faq',function(req,res,next){
     urlList=["https://cdn.contentstack.io/v3/content_types/header/entries/bltb486361a97a80102?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true","https://cdn.contentstack.io/v3/content_types/faq/entries/bltd999512f065ecc68?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true","https://cdn.contentstack.io/v3/content_types/footer/entries/blt18fe59745b5ecd54?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true"]
// Lisst=[]   
// urlLis=["header","faq","footer"]
// console.log(urlLis)
// for(i in urlLis){
//     url= urlstart+urlLis[i]+urlend

//     Lisst.push(url)
// }
//console.log(Lisst)   
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
     urlList=["https://cdn.contentstack.io/v3/content_types/header/entries/bltb486361a97a80102?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true","https://cdn.contentstack.io/v3/content_types/contact_us/entries/blt5a15df9d932ed508?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true","https://cdn.contentstack.io/v3/content_types/footer/entries/blt18fe59745b5ecd54?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true"]
   


   
    getBodies(urlList).then(function(results) {
        console.log(results)
        res.render('contactus',{
            data:results
        })
        
    }).catch(function(err) {
        console.log(err)
    });
// url="https://cdn.contentstack.io/v3/content_types/header/entries/bltb486361a97a80102?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true"

})
app.listen(port, function(){
    console.log(`Server running at port ${port}: http://localhost:${port}`)
})
