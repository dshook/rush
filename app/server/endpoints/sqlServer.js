import {Router} from 'express';
import SqlServerProvider from '../providers/SqlServer.js';
import JSONStringify from 'streaming-json-stringify';
import promisePipe from 'promisepipe';

var config_local = {
  user: 'test',
  password: 'test',
  server: 'localhost\\sqlserver',
  database: 'ReloDotNet2',
};

function handleError(er){
  this.end();
}


export default function sqlServer(){
  var router = new Router();

  router.get('/', function(req, res){
    var db = new SqlServerProvider(config_local);
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
