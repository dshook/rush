import path from 'path';
import {isReadable, isWritable} from 'isstream';
import debugLib from 'debug';
var debug = debugLib('rush:Job Runner');

class JobRunner{
  startJob(config){
    if(!config || config.length === 0){
      debug('No Config for Job Runner');
      return promise.reject('No Config to read from');
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

      var filePath = path.resolve(__dirname, '../providers/' + widget.provider + '.js');

      var Provider = require(filePath);
      try{
        var provider = new Provider(widget.config);
      }catch(e){
        return promise.reject(e);
      }

      //fall back to a transform function to allow for a transform function in the last place
      var providerFunction = provider[providerFunc] || provider.transform;
      promiseArray = promiseArray.concat(providerFunction.bind(provider)());
      debug('Loaded provider %s for %s', widget.provider, providerFunc);
    }
    return promise.reduce(promiseArray, function(aggregator, item){
      if(aggregator === null){
        return item;
      }else{
        if(isReadable(aggregator)){
          return aggregator.pipe(item);
        }else if(isWritable(aggregator)){
          return item(aggregator);
        }else{
          debug('Aggregator is neither readable or writable');
          return null;
        }
      }
    }, null);
  }
}

export default function JobRunnerService(app)
{
  app.register('jobRunner', new JobRunner()).asInstance();
}
