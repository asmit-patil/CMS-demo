//requiring all the modules
var express = require('express')
var app = express()
var config = require('./configuration/config')
var route = require('./routes/route')
var nunjucks = require('nunjucks')
var env = process.env.NODE_ENV;  
var mode = require('./configuration/' + env)

app.set('view engine', 'html')
nunjucks.configure('views', {
    autoescape : false,
    express   : app
})

app.use('/static',express.static(__dirname + '/public'))
app.use('/', route)

app.listen(mode.server.port, function(){
    console.log(`Server running at port ${mode.server.port}: http://localhost:${mode.server.port}`)
})
