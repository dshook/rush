import Application from 'billy';
import ActivityService from 'activity-service';
import Browser from './services/Browser.js';
import Store from './stores/Store.js';

// Root container
var app = new Application();

// Expose handle to logger and the app for debugging in console
global.debug = require('debug');
global.app = app;

// Services
app.service(Browser);
app.service(ActivityService);
app.service(Store);

// Configs
app.config('package', require('../../package.json'));
app.config('navigator', require('./config/navigator.js'));

// Boot
app.start();

