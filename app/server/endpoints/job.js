import {Router} from 'express';

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
    });
  });

  return router;
}