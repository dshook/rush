import {WidgetStore} from'./WidgetStore.js';
import {AppStore} from'./AppStore.js';
import {WidgetProviderStore} from'./WidgetProviderStore.js';

export default function Stores(app)
{
  app.register('stores', {
    widgetStore: app.make(WidgetStore),
    appStore: app.make(AppStore),
    widgetProviderStore: app.make(WidgetProviderStore)
  }).asInstance();
}
