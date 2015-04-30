import {Router} from 'express';
import debugLib from 'debug';
var debug = debugLib('rush:Widget Endpoint');

export default function widgets(widgetStorage)
{
  var router = new Router();

  router.get('/', function(req, res) {
    widgetStorage.get()
    .then(function(file){
      res.json(file);
    })
    .catch(function (e) {
      debug('Error getting widgets %j', e);
      res.json([]);
    })
    .finally(function(){
      res.end();
    });
  });

  //post endpoint for uploading widget files
  router.post('/', function(req, res) {
    if(req.files){
      res.json(req.files);
    }else{
      res.status(500).json({message: 'No files to upload'});
    }

    res.end();
  });

  router.put('/', function(req, res) {
    var widgetsToUpload = req.body;
    if(!widgetsToUpload){
      console.log(req);
      debug('No widgets to upload, req: %j', req);

      res.status(500).json({message: 'Nothing to upload'});
      res.end();
      return;
    }

    widgetStorage.set(widgetsToUpload)
    .then(function(){
      res.json({message: 'Configuration saved successfully.'});
    })
    .catch(function (err) {
      res.json(err);
    })
    .finally(function(){
      res.end();
    });
  });

  return router;
}
