var Application     = require('billy');
var ActivityService = require('activity-service');
var Browser         = require('./services/Browser.js');

// Root container
var app = new Application();

// Expose handle to logger and the app for debugging in console
global.debug = require('debug');
global.app = app;

// Services
app.service(Browser);
app.service(ActivityService);

// Configs
app.config('package', require('../../package.json'));
app.config('navigator', require('./config/navigator.js'));

// Boot
app.start();

