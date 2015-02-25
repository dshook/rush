var fs = Promise.promisifyAll(require('fs'));
var path = require('path');

module.exports = widgetTypes;

var Router = require('express').Router;

function widgetTypes()
{
  var router = new Router();

  //widget types are the available providers
  router.get('/', function(req, res) {
    var providerPath = path.resolve(__dirname, '../providers/'); 
    fs.readdirAsync(providerPath)
    .then(function(files){
      return files.map(function(f){ return f.replace('.js', '');});
    })
    .then(function(files){
      res.json(files);
    })
    .catch(function(e){
      res.write(e.toString());
    })
    .then(function(){
      res.end();
    });
  });

  return router;
}
