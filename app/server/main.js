var Application = require('billy');
var path        = require('path');
var HttpService = require('billy-http-express');

var app = new Application();

// load local env vars
require('dotenv').load();

// Services
app.service(HttpService);

// Configs
app.config('http', {
  port: process.env.PORT || 12345,
  webroot: path.resolve(path.join(__dirname, '../../public')),
  cookieSecret: 'shhhh'
});

app.config('package', require('../../package.json'));

app.start();
