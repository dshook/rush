import {WidgetStore} from'./WidgetStore.js';
import {AppStore} from'./AppStore.js';
import {WidgetProviderStore} from'./WidgetProviderStore.js';

export default function Stores(app, transport, config)
{
  app.register('stores', {
    widgetStore: new WidgetStore(transport),
    appStore: new AppStore(transport),
    widgetProviderStore: new WidgetProviderStore(transport)
  }).asInstance();
}
