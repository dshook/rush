var Router = require('express').Router;
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var sqlServerProvider = require('../providers/sqlServer.js');

var config_local = {
  user: 'test',
  password: 'test',
  server: 'localhost\\sqlserver',
  database: 'ReloDotNet2',
  //port: 1433,
  //stream: true,
  options: {
    // localAddress: 'localhost',
    //instanceName: 'sqlserver'
  }
};


function sqlServer(){
  var router = new Router();

  router.get('/', function(req, res){
    var db = new sqlServerProvider(config_local);
    db.connect();

    db.testRead(res)
      .then(function(){
        res.end();
      });
  });

  return router;
}

module.exports = sqlServer;