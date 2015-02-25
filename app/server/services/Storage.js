module.exports = StorageService;
var WidgetStorage = require('./Storage/widgets.js');

var debug = require('debug')('Storage Service');

function StorageService(app)
{
  app.register('widgetStorage', new WidgetStorage()).asInstance();
}

