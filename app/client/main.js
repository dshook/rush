var Application     = require('billy');
var ActivityService = require('activity-service');
var BrowserService  = require('browser-service');

// Root container
var app = new Application();

// Expose handle to logger and the app for debugging in console
global.debug = require('debug');
global.app = app;

// Services
app.service(BrowserService);
app.service(ActivityService);

// Configs
app.config('package', require('../../package.json'));
app.config('navigator', require('./config/navigator.js'));

// Boot
app.start();
