import CSVProvider from '../providers/CSV.js';
import JSONStringify from 'streaming-json-stringify';
import {Router} from 'express';

export default function postgres()
{
  var router = new Router();

  router.get('/', function(req, res) {
    var csv = new CSVProvider();
    
    csv.read()
      .then(function(stream){
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

  router.post('/', function(req, res) {
    var csv = new CSVProvider();
    
    csv.write()
      .then(function(stream){
        res.json({status: 'done!'});
      })
      .catch(function(e){
        console.log(e);
        res.end(e.toString());
      });
  });

  return router;
}
