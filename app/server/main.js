var Application   = require('billy');
var path          = require('path');
var HttpService   = require('billy-http-express');
var HttpTransport = require('http-transport');
var Router        = require('./services/Router.js');
var promise       = require('bluebird');

global.Promise = promise;

var app = new Application();

// load local env vars
require('dotenv').load();

// Services
app.service(HttpService);
app.service(HttpTransport);
app.service(Router);

// Configs
app.config('http', require('./config/http.js'));
app.config('package', require('../../package.json'));

app.start();
