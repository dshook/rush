import {Router} from 'express';
import JSONStringify from 'streaming-json-stringify';
import PostgresProvider from '../providers/Postgres.js';

export default function postgres()
{
  var router = new Router();

  router.get('/', function(req, res) {
    var config = {
      user: 'ds',
      password: 'ds',
      server: 'localhost',
      database: 'testdb'
    };
    var pg = new PostgresProvider(config);

    pg.testRead()
      .then(function(stream){
        res.setHeader('Content-Type', 'application/json');
        return stream
          .on('error', function(e){
            //this.end();
            //console.log(e, stream);
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
