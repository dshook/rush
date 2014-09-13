module.exports = routes;

/**
 * Setup all HTTP routes in the application here
 */
function routes(app, http)
{
  http.use('/api/example', app.make(require('./endpoints/example.js')));
}
