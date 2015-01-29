module.exports = routes;

/**
 * Setup all HTTP routes in the application here
 */
function routes(app, http)
{
  http.use('/api/example', app.make(require('./endpoints/example.js')));
  http.use('/api/widgets', app.make(require('./endpoints/widgets.js')));
}
