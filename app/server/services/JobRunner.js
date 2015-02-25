module.exports = JobRunnerService;
var path = require('path');

var debug = require('debug')('Job Runner');

function JobRunnerService(app)
{
  app.register('jobRunner', new JobRunner()).asInstance();
}

function JobRunner(){

}

JobRunner.prototype.startJob = function(output, config){
  debug('Starting Job');
  if(config && config.length > 0){
    var promiseArray = [];
    config.forEach(function(widget){
      debug('Loading provider %s', widget.provider);
      var filePath = path.resolve(__dirname, '../providers/' + widget.provider + '.js');
      
      var Provider = require(filePath);
      var provider = new Provider();
      provider.connect();
      promiseArray.push(provider.testRead(output));
    });
    return Promise.reduce(promiseArray, function(aggregator, item){
      return item;
    }, 0);
  }
  return Promise.resolve([]);
};