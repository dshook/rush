import WidgetStorage from './Storage/widgets.js';

var debug = require('debug')('Storage Service');

export default function StorageService(app)
{
  app.register('widgetStorage', new WidgetStorage()).asInstance();
}

