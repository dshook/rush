import fsImport from 'fs';
import Mapper from '../../../shared/lib/mapper/';
import Widget from '../../../shared/models/widget.js';
import debugLib from 'debug';
var debug = debugLib('rush:Widget Storage');

var fs = promise.promisifyAll(fsImport);

export default class Widgets{
  constructor(config) {
    this.filePath = config.get('http.uploadPath') + 'widgets.json';
    this.widgetMapper = new Mapper(Widget);
  }

  get(){
    var mapper = this.widgetMapper;
    return fs.readFileAsync(this.filePath, 'utf8')
    .then(JSON.parse)
    .then(function(file){
      return mapper.toMany(file);
    })
    .catch(function(e){
      debug('Error getting widgets %j', e);
      //it's fine if there's not a file ATM
      return promise.resolve([]);
    });
  }

  set(widgets){

    var stringData = JSON.stringify(widgets);

    return fs.writeFileAsync(this.filePath, stringData);
  }
}
