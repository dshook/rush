var Application = require('billy');

// Root container
var app = new Application();

// Expose handle to logger and the app for debugging in console
global.debug = require('debug');
global.app = app;

// Services

// Configs
app.config('package', require('../../package.json'));

// Boot
app.start();
