/// <reference path="typings/node/node.d.ts"/>
/// <reference path="typings/node/node.d.ts"/>
// test server

var express = require('express');
var faker = require('faker');
var app = express();
app.set('port', process.env.PORT || 8080);
var userData = [];
var generateUserData;

generateUserData = function(users) {
  var fakeName;
  var tmp = {};
  var i = 0;
  var obj = { 'data': [] };
  users = Object.prototype.toString.call(users) === '[object Array]' ? users : [];

  for (i = 0; i < 10; i++) {
    fakeName = faker.name;
    tmp = {
      'firstName': fakeName.firstName(),
      'lastName': fakeName.lastName(),
      'job': fakeName.jobTitle(),
      'prefix': fakeName.prefix()
    };
    users.push(tmp);
  }
  obj.data = users;
  return obj;
};

// static directories.
app.use(express.static('angular'));

// REST API Methods
app.get('/', function(req, res){
  res.type('text/plain');
  res.send('Test travel site');
});

// REST API (Send a fake user name)
app.get('/testUser', function(req, res) {
  res.type('text/plain');
  res.send(faker.name.findName());
});

// REST API (Send a fake user name)
app.get('/testUserData', function(req, res) {
  res.type('application/json');
  res.send(generateUserData());
});

app.get('/angular/default.html', function(req, res) {
  res.type('text/html');
  res.sendfile(__dirname + '/angular/default.html');
});


// custom 404 page
app.use(function(req, res){ res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

// custom 500 page
app.use(function(err, req, res, next){ console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server Error');
});



app.listen(app.get('port'), function(){
console.log( 'Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.' );
    });
