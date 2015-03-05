import CSVProvider from '../providers/CSV.js';
import JSONStringify from 'streaming-json-stringify';
import {Router} from 'express';
import stream from 'stream';
import {isReadable} from 'isstream';

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

  router.get('/file', function(req, res) {
    var csv = new CSVProvider();

    var promiseArray = [csv.generate()];
    Array.prototype.push.apply(promiseArray, csv.write());

    Promise.reduce(promiseArray, function(aggregator, item){
      if(aggregator === null){
        return item;
      }else{
        if(isReadable(aggregator)){
          return aggregator.pipe(item);
        }else{
          return item(aggregator);
        }
      }
    }, null)
    .then(function(filePath){
      res.sendFile(filePath);
      // res.send('done');
    })
    .catch(function(e){
      console.log(e);
      res.end(e.toString());
    });
  });

  return router;
}
