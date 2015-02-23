module.exports = postgres;
var pgTest  = require('../providers/postgres.js');

var Router = require('express').Router;

function postgres()
{
  var router = new Router();

  router.get('/', function(req, res) {
  	var conString = "postgres://ds:ds@localhost/testdb";
  	var pg = new pgTest(conString);
  	pg.connect();
  	
  	pg.testRead(res)
	  	.then(function(){
	  		res.end();
	  	});
  });

  return router;
}
