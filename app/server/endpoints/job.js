import {Router} from 'express';
var debug = require('debug')('Job Endpoint');

export default function Job(jobRunner, widgetStorage)
{
  var router = new Router();

  router.post('/', function(req, res) {
    //var jobId = req.body.jobId;

    widgetStorage.get()
    .catch(function (err) {
      res.json(err);
    })
    .then(function(widgets){
      return jobRunner.startJob(res, widgets);
    })
    .catch(function(e){
      res.status(500);
      console.log(e);
      res.json({error: 'Error Running Job ', message: e.toString()});
      res.end();
    })
    .finally(function(){
      debug('job done');
    });
  });

  return router;
}
