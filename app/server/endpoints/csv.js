import CSVProvider from '../providers/CSV.js';
import JSONStringify from 'streaming-json-stringify';
import {Router} from 'express';

export default function postgres()
{
  var router = new Router();

  router.get('/', function(req, res) {
    var config = {
      //delimiter : ',', // default is , 
      endLine : '\r', // default is \n, 
      //columns : ['columnName1', 'columnName2'], // by default read the first line and use values found as columns  
      //escapeChar : '"', // default is an empty string 
      //enclosedChar : '"' // default is an empty string 
    };
    var csv = new CSVProvider(config);
    
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

  return router;
}
