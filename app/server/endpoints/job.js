module.exports = Job;

var Router = require('express').Router;

function Job(jobRunner, widgetStorage)
{
  var router = new Router();

  router.post('/', function(req, res) {
    var jobId = req.body.jobId;
    
    widgetStorage.get()
    .catch(function (err) {
      res.json(err);
    })
    .then(function(widgets){
      return jobRunner.startJob(res, widgets);
    })
    .finally(function(){
      res.end();
    });
  });

  return router;
}