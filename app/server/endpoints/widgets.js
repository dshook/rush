module.exports = widgets;

var Router = require('express').Router;

function widgets()
{
  var router = new Router();

  router.get('/', function(req, res) {
    res.send(
      [
        {
          name: 'Sql Server',
          provider: 'sqlServer',
          key: 1
        },
      ]
    );
  });

  return router;
}
