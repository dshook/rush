import {Router} from 'express';
import SqlServerProvider from '../providers/SqlServer.js';

var config_local = {
  user: 'test',
  password: 'test',
  server: 'localhost\\sqlserver',
  database: 'ReloDotNet2',
};

function sqlServer(){
  var router = new Router();

  router.get('/', function(req, res){
    var db = new SqlServerProvider(config_local);
    db.connect();

    db.testRead(res)
      .then(function(){
        res.end();
      });
  });

  return router;
}

module.exports = sqlServer;