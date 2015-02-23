var Router = require('express').Router;
var sql    = require('mssql');

module.exports = sqlServer;


function sqlServer(config){
  this._config = config;
} 

sqlServer.prototype.connect = function(){
  this._client = new sql.Connection(this._config);
};

sqlServer.prototype.testRead = function(res){
  var client = this._client;
  return client.connect().then(function() {
      var request = new sql.Request(client);
      return request.query('select CURRENT_TIMESTAMP as t')
      .then(function(recordset) {
        res.write(recordset[0].t.toString());
      }).catch(function(err) {
        res.write('Request Error: ' + err.toString());
      });
  }).catch(function(err) {
      res.write('Connection Error: ' + err.toString());
  });
};