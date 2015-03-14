import appActions from '../actions/AppActions.js';
import messenger from '../messenger/AppMessenger';
import BaseStore from './BaseStore';

export const change = 'AppStore: Change';

export class AppStore extends BaseStore{
	constructor(transport){
    super();

    this.change = change;
    this.messenger = messenger;    
    this.transport = transport;

    this._results = [];

    this.dataSource = '/api/job';
  }

  get results(){
    return this._results;
  }

  [messenger.ev(appActions.startAction)](){
    this.transport
      .post(this.dataSource, {jobId: 1})
      .then(result => {
        this._results = result.body;
        this.emitChange();
      });
  }
}
