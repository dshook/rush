var fs = Promise.promisifyAll(require('fs'));
module.exports = widgets;

var Router = require('express').Router;

function widgets()
{
  var filePath = './public/config/widgets.json';
  var router = new Router();

  router.get('/', function(req, res) {
    fs.readFileAsync(filePath, 'utf8')
    .catch(function (err) {
      res.json([]);
    })
    .then(JSON.parse)
    .then(function(file){
      res.json(file);
    })
    .finally(function(){
      res.end();
    });
  });

  router.put('/', function(req, res) {
    var stringData = JSON.stringify(req.body);

    fs.writeFileAsync(filePath, stringData)
    .catch(function (err) {
      res.json(err);
    })
    .then(function(){
      res.write('Configuration saved successfully.');
    })
    .finally(function(){
      res.end();
    });
  });

  return router;
}
