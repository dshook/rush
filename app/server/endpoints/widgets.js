import {Router} from 'express';

export default function widgets(widgetStorage)
{
  var router = new Router();

  router.get('/', function(req, res) {
    widgetStorage.get()
    .catch(function (err) {
      res.json([]);
    })
    .then(function(file){
      res.json(file);
    })
    .finally(function(){
      res.end();
    });
  });

  //post endpoint for uploading widget files
  router.post('/', function(req, res) {
    var widgets = req.body;

    if(req.files){
      res.json(req.files);
    }else{
      res.status(500).json({message: 'No files to upload'});
    }

    res.end();
  });

  router.put('/', function(req, res) {
    var widgets = req.body;

    widgetStorage.set(widgets)
    .catch(function (err) {
      res.json(err);
    })
    .then(function(){
      res.write('Configuration saved successfully.');
    })
    .finally(function(){
      res.end();
    });
  });

  return router;
}
