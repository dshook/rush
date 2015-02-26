var Router = require('express').Router;
var sql    = require('mssql');

export default class SqlServer{
  constructor(config){
    this._config = config;
  } 

  connect(){
    this._client = new sql.Connection(this._config);
  }

  read(res, query){
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
  }

  testRead(res){
    var client = this._client;
    return this.read(res, 'select CURRENT_TIMESTAMP as t');
  }

}