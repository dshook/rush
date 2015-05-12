import {Router} from 'express';
import JSONStringify from 'streaming-json-stringify';
import SqlServerProvider from '../providers/SqlServer.js';
import debugLib from 'debug';
var debug = debugLib('rush:SqlServer Endpoint');

export default function sqlServer()
{
  var router = new Router();

  router.get('/', function(req, res){
    var config = {
      user: 'test',
      password: 'test',
      server: 'localhost\\sqlserver',
      database: 'ReloDotNet2'
    };
    var db = new SqlServerProvider(config);

    db.testRead()
      .then(function(stream){
        debug('stream res %j', stream);
        res.setHeader('Content-Type', 'application/json');
        return stream
          .on('error', function(e){
            res.end(e.toString());
          })
          .pipe(new JSONStringify())
          .pipe(res);
      })
      .catch(function(e){
        console.log(e);
        res.end(e.toString());
      });
  });

  return router;
}
