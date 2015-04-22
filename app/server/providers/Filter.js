import stream from 'stream'

export default class Filter{
  constructor(config){
    this._config = config || {};
    this._config.filter = this._config.filter || '';
    //this._config.useRegex = this._config.useRegex || false;
  }

  transform(){
    var transform = new stream.Transform( { objectMode: true } );
    var filter = this._config.filter;
    //var useRegex = this._config.useRegex;

    transform._transform = function (chunk, encoding, done) {
      try{
        //very naieve implementation for the moment, needs to recurse, support regex etc
        for(var key in chunk){
            if(('' + chunk[key]).indexOf(filter) > -1){
              this.push(chunk);
              break;
            }
        }
        done();
      }catch(e){
        return Promise.reject('Error In Filter Transform: ' + e.toString());
      }
    };

    transform._flush = function (done) {
      done();
    };

    return transform;
  }
}
