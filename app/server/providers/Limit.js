import Promise from 'bluebird';
import stream from 'stream';

export default class Limit{
  constructor(config){
    this._config = config || {};
    this._config.limit = this._config.limit || 10;
  }

  transform(){
    var limitTransform = new stream.Transform( { objectMode: true } );
    var limit = this._config.limit;
    var timesCalled = 0;

    limitTransform._transform = function (chunk, encoding, done) {
      try{
        if(timesCalled++ < limit) this.push(chunk);
        //TODO: catch errors in here properly
        //chunk.nuts.soup = 4;
        done();
      }catch(e){
        return Promise.reject('Error In Limit Transform: ' + e.toString());
      }
    };

    limitTransform._flush = function (done) {
      done();
    };

    return limitTransform;
  }
}
