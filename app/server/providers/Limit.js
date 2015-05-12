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
      if(timesCalled++ < limit) this.push(chunk);

      done();
    };

    limitTransform._flush = function (done) {
      done();
    };

    return limitTransform;
  }
}
