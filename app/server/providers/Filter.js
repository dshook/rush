import stream from 'stream';
import searchStream from 'search-stream';

export default class Filter{
  constructor(config){
    this._config = config || {};
    this._config.useRegex = this._config.useRegex || false;
    this._config.filter = this._config.filter || '';

    if(this._config.useRegex){
      var splitFilter = this._config.filter.split('/');
      if(splitFilter.length !== 3){
        throw new Error('Filter Regex must be specified in /pattern/ form')
      }
      this._config.filter = new RegExp(splitFilter[1], splitFilter[2]);
    }

    this._config.searchKeys = this._config.searchKeys || [];
    if(this._config.searchKeys && this._config.searchKeys.length > 0){
      this._config.searchKeys = this._config.searchKeys.split(',');
    }
  }

  transform(){
    var search = searchStream({searchKeys: this._config.searchKeys});
    var filter = this._config.filter;

    return search(filter);
  }
}
