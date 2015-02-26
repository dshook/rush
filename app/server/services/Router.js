var debug = require('debug')('Routes');

/**
 * Service responsible for setting up all http routes in the application
 * @constructor
 */
export default function Router(app)
{
  app.make(require('../routes.js'));
  debug('http routes added');
}
