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

  router.post('/', function(req, res) {
    var widgets = req.body;

    if(req.files){
      console.log(req.files);
    }

    res.write('Configuration saved successfully.');
    res.end();
  });

  router.put('/', function(req, res) {
    var widgets = req.body;

    if(req.files){
      console.log(req.files);
    }

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
