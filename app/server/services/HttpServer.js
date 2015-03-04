module.exports = HttpServer;

var express     = require('express');
var debug       = require('debug')('HttpServer');
var auth        = require('http-auth');
var bodyParser  = require('body-parser');
var compression = require('compression');
var multer      = require('multer');

/**
 * Root HTTP server
 * @constructor
 */
function HttpServer(app, config)
{
  this.http   = express();
  this.config = config;
  this.app    = app;

  app.register('http', this.http).asInstance();

  // Setup basic auth before anything else
  this.basicAuth();

  // Boot the actual server class first
  var ServerT = config.get('http.server', null);
  if (ServerT) {
    debug('creating server object');
    app.make(ServerT);
  }
}

/**
 * Setup basic auth on this server if required
 */
HttpServer.prototype.basicAuth = function()
{
  var username = this.config.get('http.username',
    process.env.HTTP_USERNAME || null);
  var password = this.config.get('http.password',
    process.env.HTTP_PASSWORD || null);

  if (!username && !password)
    return;

  debug('using http basic auth: %s:%s', username || '*', password || '*');

  var basic = auth.basic({}, function(u, pw, done) {
    if (username && username !== u)
      done(false);
    if (password && password !== pw)
      done(false);
    done(true);
  });

  this.http.use(auth.connect(basic));
};

/**
 * Start listener
 * @return {Promise}
 */
HttpServer.prototype.start = function()
{
  var http = this.http;

  // Try to find a port
  var port = this.config.get('http.port', process.env.PORT || 8123);

  // Ensure default secret for anybody eles that needs it
  this.config.get('http.secret', 'supersecret');

  // Mount static server last
  var webroot = this.config.get('http.webroot', null);
  if (webroot) {
    if (!Array.isArray(webroot))
      webroot = [webroot];

    webroot.forEach(function(p) {
      http.use(express.static(p));
      debug('mounting webroot at %s', p);
    });
  }

  http.use(compression());

  // for parsing application/json, no, this shouldn't be here
  http.use(bodyParser.json()); 

  //file uploads
  http.use(multer({ 
    dest: this.config.get('http.uploadPath'),
  }));

  // error handling, maybe
  // http.use(function(err, req, res, next) {
  //   res.status(500);
  //   res.json({ httpServerError: err });
  //   res.end();
  // }); 

  return new Promise(function(resolve, reject) {
    http.listen(port, function(err) {
      if (err) return reject(err);
      debug('http server is listening on port %s', port);
      resolve();
    });
  });
};

