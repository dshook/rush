import {Router} from 'express';
import SqlServerProvider from '../providers/SqlServer.js';
import JSONStringify from 'streaming-json-stringify';

var configLocal = {
  user: 'test',
  password: 'test',
  server: 'localhost\\sqlserver',
  database: 'ReloDotNet2'
};

function handleError(){
  this.end();
}


export default function sqlServer(){
  var router = new Router();

  router.get('/', function(req, res){
    var db = new SqlServerProvider(configLocal);
    db.connect();

    var toJSON = new JSONStringify();

    db.testRead()
      .then(function(stream){
        return stream
          .on('error', function(e){
            stream.unpipe();
            return res.end(e.toString());
          })
          .pipe(toJSON)
          .pipe(res);
      })
      .catch(handleError.bind(res));
  });

  return router;
}
