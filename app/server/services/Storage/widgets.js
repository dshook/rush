var fs = Promise.promisifyAll(require('fs'));
var Mapper = require('../../../shared/lib/mapper/');
var Widget = require('../../../shared/models/widget.js');

module.exports = widgets;

function widgets()
{
  this.filePath = './public/config/widgets.json';
  this.widgetMapper = new Mapper(Widget);
}

widgets.prototype.get = function(){
  var mapper = this.widgetMapper;
  return fs.readFileAsync(this.filePath, 'utf8')
  //TODO: handle exception here
  .then(JSON.parse)
  .then(function(file){
    return mapper.toMany(file);
  });
};

widgets.prototype.set = function(widgets){

  var stringData = JSON.stringify(widgets);

  return fs.writeFileAsync(this.filePath, stringData);
};
