import WidgetStorage from './Storage/widgets.js';

var debug = require('debug')('Storage Service');

export default function StorageService(app, config)
{
  app.register('widgetStorage', new WidgetStorage(config)).asInstance();
}

