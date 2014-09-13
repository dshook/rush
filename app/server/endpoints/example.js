module.exports = example;

var Router = require('express').Router;

function example()
{
  var router = new Router();

  router.get('/', function(req, res) {
    res.send({ hello: 'earf' });
  });

  return router;
}
