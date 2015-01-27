module.exports = Browser;

var HttpTransport = require('http-transport');
var LocalStorage  = require('local-storage');
var Promise       = require('bluebird');
var $             = require('jquery');
var debug         = require('debug')('Browser');

/**
 * Setup local storage and HTTP transports
 *
 * configs:
 * * `storage.namespace` Optional namespace for local storage
 * * `dom.root` query selector for the app root DOM node (defaults to body)
 * @constructor
 */
function Browser(app, config)
{
  var namespace = config.get('storage.namespace', 'app-storage');

  var selector = config.get('dom.rootSelector', '.layout');

  app.register('transport', new HttpTransport()).asInstance();
  app.register('storage', new LocalStorage(namespace)).asInstance();
  app.register('$root', $(selector)).asInstance();
}

/**
 * Wait for page to load
 */
Browser.prototype.start = function()
{
  return new Promise(function(resolve, reject) {
    $(function() {
      debug('page ready');
      resolve();
    });
  });
};
