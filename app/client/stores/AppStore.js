import appActions from '../actions/AppActions.js';
import messenger from '../messenger/AppMessenger';
import BaseStore from './BaseStore';
import WidgetStore from './WidgetStore.js';

export var change = 'AppStore: Change';

export class AppStore extends BaseStore{
	constructor(transport){
    super();

    this.change = change;
    this.messenger = messenger;    
    this.transport = transport;

    this._results = [];

    this.dataSource = '/api/sqlServer';
  }

  get results(){
    return this._results;
  }

  [messenger.ev(appActions.startAction)](){
    this.transport
      .get(this.dataSource)
      .then(result => {
        this._results = result.body;
        this.emitChange();
      });
  }
}

