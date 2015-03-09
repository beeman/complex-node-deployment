var express = require('express');
var health = require('express-ping');
var cors = require('cors');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(health.ping());

app.get('/', function(req, res){
  res.redirect('/ping');
});

http.createServer(app).listen(app.get('port'), function() {
    console.log("Server listening on port " + app.get('port'));
});
