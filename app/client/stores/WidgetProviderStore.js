import appActions from '../actions/AppActions.js';
import messenger from '../messenger/AppMessenger';
import BaseStore from './BaseStore';

export const change = 'WidgetProviderStore: Change';

export class WidgetProviderStore extends BaseStore{
  constructor(transport){
    super();

    this.change = change;
    this.messenger = messenger;
    this.transport = transport;

    this._widgetProviders = [];

    this.dataSource = '/api/widgetProviders';

    this.transport
      .get(this.dataSource)
      .then(result => {
        this._widgetProviders = result.body;
        this.emitChange();
      });
  }

  get widgetProviders(){
    return this._widgetProviders;
  }
}
