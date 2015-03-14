import WidgetStorage from './Storage/widgets.js';

export default function StorageService(app, config)
{
  app.register('widgetStorage', new WidgetStorage(config)).asInstance();
}

