var debug = require('debug')('Store');
import {WidgetStore} from'./WidgetStore.js';

/**
 * Setup local storage and HTTP transports
 *
 * configs:
 * * `storage.namespace` Optional namespace for local storage
 * * `dom.root` query selector for the app root DOM node (defaults to body)
 * @constructor
 */
export default function Store(app, transport, config)
{
  app.register('widgetStore', new WidgetStore(transport)).asInstance();
}
