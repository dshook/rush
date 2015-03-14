var promise       = require('bluebird');
global.Promise = promise;

/*eslint-disable */
//Enable es6 for node code
var babel = require("babel/register");
/*eslint-enable */

var Application   = require('billy');
var HttpService   = require('./services/HttpServer.js');
var HttpTransport = require('http-transport');
var Storage       = require('./services/Storage.js');
var Router        = require('./services/Router.js');
var JobRunner     = require('./services/JobRunner.js');


var app = new Application();

// load local env vars
require('dotenv').load();

// Services
app.service(HttpService);
app.service(HttpTransport);
app.service(Storage);
app.service(Router);
app.service(JobRunner);

// Configs
app.config('http', require('./config/http.js'));
app.config('package', require('../../package.json'));

app.start();
