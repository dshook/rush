import {Router} from 'express';
import JSONStringify from 'streaming-json-stringify';
import {isReadable} from 'isstream';
import dbg from 'debug';
import _ from 'lodash';

var debug = dbg('Job Endpoint');

function runJob(res, jobRunner, widgets){
  return jobRunner.startJob(widgets)
    .then(function(jobResult){
      return new Promise(function(resolve, reject){
        //decide what to do with the output based on its value
        if(isReadable(jobResult)){
          res.setHeader('Content-Type', 'application/json');
          var resultStream = jobResult.pipe(new JSONStringify()).pipe(res);

          resultStream.on('end', resolve);
          resultStream.on('error', e => reject(e));
        }else if(typeof jobResult  === 'string' && jobResult.indexOf('/') > -1){
          //file download
          res.json({fileLink: jobResult});
        }else{
          res.json(jobResult);
        }
      });
    })
    .catch(function(e){
      res.status(500);
      console.log(e);
      res.json({error: 'Error Running Job ', message: e.toString()});
    })
    .finally(function(){
      res.end();
      debug('job done');
    });
}

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
      return runJob(res, jobRunner, widgets);
    });
  });

  router.post('/preview', function(req, res) {
    var widgetKey = req.body.widgetKey;
    widgetStorage.get()
    .catch(function (err) {
      res.json(err);
    })
    .then(function(widgets){
      //run the config up till the specified widget key
      var widgetIndex = _.findIndex(widgets, w => w.key === widgetKey);
      widgets = _.take(widgets, widgetIndex + 1);
      //and stick a limit on
      widgets.push({name: "Limit", provider: "Limit"});
      return runJob(res, jobRunner, widgets);
    })
    .catch(function (err) {
      res.json(err);
    });
  });

  return router;
}

