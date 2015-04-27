import stream from 'stream';
import searchStream from 'search-stream';

export default class Filter{
  constructor(config){
    this._config = config || {};
    this._config.filter = this._config.filter || '';
    //this._config.useRegex = this._config.useRegex || false;
  }

  transform(){
    var search = searchStream();
    var filter = this._config.filter;

    return search(filter);
  }
}
