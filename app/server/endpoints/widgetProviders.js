var fs = Promise.promisifyAll(require('fs'));
import path from 'path';
import {Router} from 'express';

export default function widgetProviders()
{
  var router = new Router();

  router.get('/', function(req, res) {
    var providerPath = path.resolve(__dirname, '../providers/');
    fs.readdirAsync(providerPath)
    .then(function(files){
      return files.map(function(f){ return f.replace('.js', ''); });
    })
    .catch(function(e){
      res.write(e.toString());
    })
    .then(function(files){
      res.json(files);
    })
    .then(function(){
      res.end();
    });
  });

  return router;
}
