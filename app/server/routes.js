var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

module.exports = routes;

/**
 * Setup all HTTP routes in the application here
 */
function routes(app, http)
{
  http.use(bodyParser.json()); // for parsing application/json, no, this shouldn't be here

  //set up dynamic routes to the endpoints folder
  var endpointPath = './endpoints/'; 
  fs.readdir(path.resolve(__dirname, endpointPath), function(err, files){
    if(err){
      throw 'Could not find endpoint path';
    }

    files.forEach(function(item){
      item = item.replace('.js', '');
      http.use('/api/' + item, app.make(require(endpointPath + item + '.js')));
    });
  });
}
