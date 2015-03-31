import appActions from '../actions/AppActions.js';
import messenger from '../messenger/AppMessenger';
import BaseStore from './BaseStore';

export const change = 'AppStore: Change';
export const previewChange = 'AppStore: PreviewChange';

export class AppStore extends BaseStore{
	constructor(transport){
    super();

    this.change = change;
    this.previewChange = previewChange;
    this.messenger = messenger;
    this.transport = transport;

    this._results = [];
    this._preview = [];

    this.dataSource = '/api/job';
  }

  get results(){
    return this._results;
  }

  get preview(){
    return this._preview;
  }

  [messenger.ev(appActions.startAction)](){
    this.transport
      .post(this.dataSource, {jobId: 1})
      .then(result => {
        this._results = result.body;
        this.emitChange();
      });
  }

  [messenger.ev(appActions.previewAction)](widgetKey){
    this.transport
      .post(this.dataSource + '/preview', {jobId: 1, widgetKey: widgetKey})
      .then(result => {
        this._preview = result.body;
        this.messenger.trigger(this.previewChange);
      });
  }

  [messenger.ev(appActions.clearPreviewAction)](){
    //clear and refresh to make sure old results aren't cached
    this._preview = [];
  }
}
