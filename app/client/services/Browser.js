module.exports = Browser;

var HttpTransport = require('http-transport');
var LocalStorage  = require('local-storage');
var $             = require('jquery');

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

  var selector = config.get('dom.rootSelector', 'body');

  app.register('transport', new HttpTransport()).asInstance();
  app.register('storage', new LocalStorage(namespace)).asInstance();
  app.register('$root', $(selector)).asInstance();
}
