import appActions from '../actions/AppActions.js';
import messenger from '../messenger/AppMessenger';
import BaseStore from './BaseStore';

export var change = 'WidgetTypeStore: Change';

export class WidgetTypeStore extends BaseStore{
  constructor(transport){
    super();

    this.change = change;
    this.messenger = messenger;    
    this.transport = transport;

    this._widgetTypes = [];

    this.dataSource = '/api/widgetTypes';

    this.transport
      .get(this.dataSource)
      .then(result => {
        this._widgetTypes = result.body;
        this.emitChange();
      });
  }

  get widgetTypes(){
    return this._widgetTypes;
  }
}



