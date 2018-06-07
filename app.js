//requiring all the modules
var express = require('express')
var app = express()
var config = require('./configuration/config.js')
var route = require('./routes/route.js')

app.use(express.static(__dirname + '/public'))
app.use('/', route)

app.listen(config.server.port, function(){
    console.log(`Server running at port ${config.server.port}: http://localhost:${config.server.port}`)
})
