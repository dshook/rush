import {Router} from 'express';
var debug = require('debug')('Job Endpoint');

export default function Job(jobRunner, widgetStorage)
{
  var router = new Router();

  router.post('/', function(req, res) {
    var jobId = req.body.jobId;
    
    widgetStorage.get()
    .catch(function (err) {
      res.json(err);
    })
    .then(function(widgets){
      res.setHeader('Content-Type', 'application/json');
      return jobRunner.startJob(res, widgets);
    })
    .catch(function(e){
      res.status(500);
      res.json({error: 'Error Running Job', message: e.toString()});
      res.end();
    })
    .finally(function(result){
      debug('job done');
    });
  });

  return router;
}