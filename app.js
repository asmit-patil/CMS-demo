var express = require('express')
var app = express()
var nunjucks  = require('nunjucks');
const port = process.env.PORT || 8012;
var engine = require('consolidate');
app.use('/public', express.static('public'))
app.set('views', __dirname + '/views');
app.engine('html', engine.mustache);
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

app.get('/',function(req,res,next){
    // const options = {  
    //     url: 'https://cdn.contentstack.io/v3/content_types/home/entries/blt18ca953908cad013?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true',
    //     method: 'GET'
        
    // };
    
    // request(options, function(err, res2, body) {

    //     if (err || res2.statusCode !== 200) {
    //         return res2.sendStatus(500);
    //     } 

    //     let json = JSON.parse(body);
    //     console.log(typeof body,"body");
    //     console.log(typeof json,"json");
        
    //     res.render('home',{ 
    //         entry:json.entry
    //     })
    // });

    var urlList=["https://cdn.contentstack.io/v3/content_types/header/entries/bltb486361a97a80102?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true","https://cdn.contentstack.io/v3/content_types/home/entries/blt18ca953908cad013?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true","https://cdn.contentstack.io/v3/content_types/footer/entries/blt18fe59745b5ecd54?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true"]
    function getBodies(array) {
        return Promise.map(urlList, function(url) {
            return request.getAsync(url).spread(function(response,body) {
                return JSON.parse(body);
            });
        });
    }

    // sample usage of helper function
    getBodies(urlList).then(function(results) {
        console.log(results)
        res.render('home',{
            data:results
        })
        
    }).catch(function(err) {
        console.log(err)
    });
})

//footer url ---------> https://cdn.contentstack.io/v3/content_types/footer/entries/blt18fe59745b5ecd54?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true
//header url---------> https://cdn.contentstack.io/v3/content_types/header/entries/bltb486361a97a80102?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true
//contctus url--------->https://cdn.contentstack.io/v3/content_types/contact_us/entries/blt5a15df9d932ed508?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true
//var request = Promise.promisifyAll(require("request"), {multiArgs: true});

app.get('/faq',function(req,res,next){
    var urlList=["https://cdn.contentstack.io/v3/content_types/header/entries/bltb486361a97a80102?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true","https://cdn.contentstack.io/v3/content_types/faq/entries/bltd999512f065ecc68?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true","https://cdn.contentstack.io/v3/content_types/footer/entries/blt18fe59745b5ecd54?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true"]
    function getBodies(array) {
        return Promise.map(urlList, function(url) {
            return request.getAsync(url).spread(function(response,body) {
                return JSON.parse(body);
            });
        });
    }


    // sample usage of helper function
    getBodies(urlList).then(function(results) {

        res.render('faq',{
            data:results
        })
        
    }).catch(function(err) {
        console.log(err)
    });
})

app.get('/contactus',function(req,res,next){
    var urlList=["https://cdn.contentstack.io/v3/content_types/header/entries/bltb486361a97a80102?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true","https://cdn.contentstack.io/v3/content_types/contact_us/entries/blt5a15df9d932ed508?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true","https://cdn.contentstack.io/v3/content_types/footer/entries/blt18fe59745b5ecd54?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true"]
    function getBodies(array) {
        return Promise.map(urlList, function(url) {
            return request.getAsync(url).spread(function(response,body) {
                return JSON.parse(body);
            });
        });
    }


    // sample usage of helper function
    getBodies(urlList).then(function(results) {

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
