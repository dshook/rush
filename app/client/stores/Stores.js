var debug = require('debug')('Store');
import {WidgetStore} from'./WidgetStore.js';
import {AppStore} from'./AppStore.js';
import {WidgetTypeStore} from'./WidgetTypeStore.js';

export default function Stores(app, transport, config)
{
  app.register('stores', {
    widgetStore: new WidgetStore(transport),
    appStore: new AppStore(transport),
    widgetTypeStore: new WidgetTypeStore(transport),
  }).asInstance();
}
