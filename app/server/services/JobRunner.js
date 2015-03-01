import path from 'path';
import JSONStringify from 'streaming-json-stringify';
var debug = require('debug')('Job Runner');

class JobRunner{
  startJob(output, config){
    if(!config || config.length === 0){
      debug('No Config for Job Runner');
      output.status(500).write('No Config to Run');
      return Promise.resolve([]);
    }

    debug('Starting Job');
    var promiseArray = [];

    //add each config item to the promise array
    config.forEach(function(widget){
      debug('Loading provider %s', widget.provider);
      var filePath = path.resolve(__dirname, '../providers/' + widget.provider + '.js');
      
      var Provider = require(filePath);
      var provider = new Provider(widget.config);
      provider.connect();
      promiseArray.push(provider.read(widget.query));
    });

    //add the JSON'd output as the final items of the pipe for now to return to client
    promiseArray.push(new JSONStringify());
    promiseArray.push(output);

    //which then gets piped together
    return Promise.reduce(promiseArray, function(aggregator, item){
      if(aggregator === null){
        return item;
      }else{
        return aggregator.on('error', function(e){
          output.status(500).end(e.toString());
        }).pipe(item);
      }
    }, null)
    .catch(function(e){
      output.status(500).write(e.toString());
      output.end();
    });
  }
}

export default function JobRunnerService(app)
{
  app.register('jobRunner', new JobRunner()).asInstance();
}
