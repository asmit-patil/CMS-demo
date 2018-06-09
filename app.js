//requiring all the modules
var express = require('express')
var app = express()
var config = require('./configuration/constants')
//var route = require('./routes/index_route')
var nunjucks = require('nunjucks')
var env = process.env.NODE_ENV 
var mode, port
if( (env != "null") && ((env == "production") || (env == "staging")) ){
   mode = require('./configuration/' + env)
   port = mode.server.port
}else{
    port = 5000
}

app.set('view engine', 'html')
nunjucks.configure('views', {
    autoescape : false,
    express   : app
})

//static files
app.use('/static',express.static(__dirname + '/public'))

//routes
require('./routes/index_route')(app)

// app.use(function (err, req, res, next) {
//     console.error(err.stack)
//     res.status(500).send('Something broke!')
//   })
process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
    });
    
app.listen(port, function(){
    console.log(`Server running at port ${port}: http://localhost:${port}`)
})
