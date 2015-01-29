module.exports = widgets;

var Router = require('express').Router;

function widgets()
{
  var router = new Router();

  router.get('/', function(req, res) {
    res.send({
      maxKey: 2,
      widgets: [
        {name: 'First Widget', key: 1},
        {name: 'Second Widget', key: 2}
      ]
    });
  });

  return router;
}
