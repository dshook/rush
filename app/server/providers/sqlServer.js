var Router = require('express').Router;
var sql    = require('mssql');

module.exports = sqlServer;

var config_local = {
  user: 'test',
  password: 'test',
  server: 'localhost\\sqlserver',
  database: 'ReloDotNet2',
  //stream: true
};

function sqlServer(config){
  this._config = config;
} 

sqlServer.prototype.connect = function(){
  this._client = new sql.Connection(this._config);
};

sqlServer.prototype.read = function(res, query){
  var client = this._client;
  return client.connect().then(function() {
      var request = new sql.Request(client);
      return request.query(query)
      .then(function(recordset) {
        res.json(recordset);
      }).catch(function(err) {
        res.write('Request Error: ' + err.toString());
      });
  }).catch(function(err) {
      res.write('Connection Error: ' + err.toString());
  });
};

sqlServer.prototype.testRead = function(res){
  var client = this._client;
  return this.read(res, 'select CURRENT_TIMESTAMP as t');
};