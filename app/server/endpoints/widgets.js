module.exports = widgets;

var Router = require('express').Router;

function widgets()
{
  var router = new Router();

  router.get('/', function(req, res) {
    res.send(
      [
        // {
        //   name: 'Sql Server',
        //   provider: 'sqlServer',
        //   key: 1
        // },
      ]
    );
  });

  router.put('/', function(req, res) {
    console.log(req.body);
    res.json(req.body);
    res.end();
  });

  return router;
}
