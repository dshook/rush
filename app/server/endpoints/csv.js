import CSVProvider from '../providers/CSV.js';
import JSONStringify from 'streaming-json-stringify';
import {Router} from 'express';
import {isReadable, isWritable} from 'isstream';
import debugLib from 'debug';
var debug = debugLib('rush:csv Endpoint');

export default function csvEndpoint()
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

    promise.reduce(promiseArray, function(aggregator, item){
      if(aggregator === null){
        return item;
      }else{
        if(isReadable(aggregator)){
          return aggregator.pipe(item);
        }else if(isWritable(aggregator)){
          return item(aggregator);
        }else{
          reject('Widget is neither readable or writable');
        }
      }
    }, null)
    .then(function(filePath){
      debug('Job Aggregated');
      res.write(filePath);
      // res.send('done');
    })
    .catch(function(e){
      console.log(e);
      res.write(e.toString());
    })
    .finally(function(){
      res.end();
    });
  });

  return router;
}
