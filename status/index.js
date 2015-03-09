var express = require('express');
var health = require('express-ping');
var cors = require('cors');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(health.ping());

app.get('/', function(req, res){
  res.redirect('/inventory');
});

app.get('/inventory', function(req, res){

  // TODO Create a module for this inventory
  var envvars = [
    'ADMIN_NAME'  , 'ADMIN_PORT',
    'API_NAME'    , 'API_PORT',
    'MOBILE_NAME' , 'MOBILE_PORT',
    'MONGODB_NAME', 'MONGODB_PORT',
    'REDIS_NAME'  , 'REDIS_PORT',
    'SITE_NAME'   , 'SITE_PORT',
    'STATIC_NAME' , 'STATIC_PORT',
    'WORKER_NAME' , 'WORKER_PORT'
  ];

  var applications = {}

  for(idx in envvars) {
    var envvar = envvars[idx];

    // The environment variables are split by LABEL_KEY
    var parts = envvar.split('_');
    var label = parts[0].toLowerCase();
    var key = parts[1].toLowerCase();

    if(applications[label] === undefined) {
      applications[label] = {
        name: null,
        port: null,
        type: null,
        url: null
      };
    }

    value = process.env[envvar];

    if(key === 'port') {
      var portinfo = value.split(':');
      if(portinfo[2] == '3000') {
        applications[label]['type'] = 'expressjs';
        applications[label]['url'] = value.replace('tcp:', 'http:');
      }
      if(portinfo[2] == '27017') {
        applications[label]['type'] = 'mongodb';
        applications[label]['url'] = value.replace('tcp:', 'mongo:');
      }
      if(portinfo[2] == '6379') {
        applications[label]['type'] = 'redis';
        applications[label]['url'] = value;
      }
    }

    applications[label][key] = value;
  }

  res.send(applications);
});

http.createServer(app).listen(app.get('port'), function() {
    console.log("Server listening on port " + app.get('port'));
});
