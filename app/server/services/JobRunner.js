import path from 'path';
import JSONStringify from 'streaming-json-stringify';
import {isReadable, isDuplex, isWritable} from 'isstream';
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
    //for now, first provider is a read, last is a write
    //everything in the middle is transform
    for(let w = 0; w < config.length; w++){
      let widget = config[w];
      let providerFunc = '';
      switch(w){
        case 0:
          providerFunc = 'read';
          break;
        case config.length - 1:
          providerFunc = 'write';
          break;
        default:
          providerFunc = 'transform';
      }

      debug('Loading provider %s for %s', widget.provider, providerFunc);
      var filePath = path.resolve(__dirname, '../providers/' + widget.provider + '.js');

      var Provider = require(filePath);
      var provider = new Provider(widget.config);

      //fall back to a transform function to allow for a transform function in the last place
      var providerFunction = provider[providerFunc] || provider.transform;
      //promiseArray = promiseArray.concat(provider[providerFunc]());
      promiseArray = promiseArray.concat(providerFunction.bind(provider)());
    }

    //create a promise wrapper over all streams to find when the next to last one is done
    return new Promise(function (resolve, reject) {
      //which then gets piped together
      Promise.reduce(promiseArray, function(aggregator, item){
        if(aggregator === null){
          return item;
        }else{
          if(isReadable(aggregator)){
            return aggregator
              .on('error', function(e){
                reject(e);
              })
              .pipe(item);
          }else if(isWritable(aggregator)){
            return item(aggregator);
          }else{
            reject('Widget is neither readable or writable');
          }
        }
      }, null)
      .catch(function(e){
        reject(e);
      })
      .then(function(jobResult){
        //decide what to do with the output based on its value
        if(isReadable(jobResult)){
          jobResult.on('end', resolve);
          //TODO: clean up how errors are handled, ideally no header set here
          output.setHeader('Content-Type', 'application/json');
          jobResult.pipe(new JSONStringify()).pipe(output);
        }else if(typeof jobResult  === 'string' && jobResult.indexOf('/') > -1){
          //file download
          output.json({fileLink: jobResult});
        }else{
          output.json(jobResult);
        }
      });
    });
  }
}

export default function JobRunnerService(app)
{
  app.register('jobRunner', new JobRunner()).asInstance();
}
