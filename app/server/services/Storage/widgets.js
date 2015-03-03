var fs = Promise.promisifyAll(require('fs'));
import Mapper from '../../../shared/lib/mapper/';
import Widget from '../../../shared/models/widget.js';

export default class Widgets{
  constructor(config) {
    this.filePath = config.get('http.uploadPath') + '/widgets.json';
    this.widgetMapper = new Mapper(Widget);
  }

  get(){
    var mapper = this.widgetMapper;
    return fs.readFileAsync(this.filePath, 'utf8')
    .catch(function(e){
      //it's fine if there's not a file ATM
      return Promise.resolve([]);
    })
    .then(JSON.parse)
    .then(function(file){
      return mapper.toMany(file);
    });
  }

  set(widgets){

    var stringData = JSON.stringify(widgets);

    return fs.writeFileAsync(this.filePath, stringData);
  }
}