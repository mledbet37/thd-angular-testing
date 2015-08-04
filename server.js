/// <reference path="typings/node/node.d.ts"/>
// test server

var express = require('express'),
    faker = require('faker'),
    app = express(),
    userData = [],
    generateUserData,
    generateProductData;
    
app.set('port', process.env.PORT || 8080);

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
app.get('/getUserData', function(req, res) {
  res.type('application/json');
  res.send(generateUserData());
});

// REST API (Send a fake user name)
app.get('/getProductData', function(req, res) {
  res.type('application/json');
  res.send(generateProductData());
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

// Faker data generator:

// generate some fake users.
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

// generate some fake products.
generateProductData = function(products) {
  var fakeProduct;
  var tmp = {};
  var i = 0;
  var obj = { 'data': [] };
  products = Object.prototype.toString.call(products) === '[object Array]' ? products : [];
  for (i = 0; i < 20; i++) {
    fakeProduct = faker.commerce;
    tmp = {
      'product': fakeProduct.product(),
      'productName': fakeProduct.productName(),
      'productMaterial': fakeProduct.productMaterial(),
      'department': fakeProduct.department(),
      'price': fakeProduct.price()
    };
    products.push(tmp);
  }
  obj.data = products;
  return obj;
};

app.listen(app.get('port'), function(){
console.log( 'Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.' );
    });
