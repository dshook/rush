import widgetActions from '../actions/WidgetActions';
import messenger from '../messenger/AppMessenger';
import BaseStore from './BaseStore';

export var change = 'WidgetStore: Change';

export class WidgetStore extends BaseStore{
	constructor(transport){
    super();

    this.change = change;
    this.messenger = messenger;    
    this.transport = transport;

    this.dataSource = '/api/widgets';
    this._widgets = [];

    this.transport
      .get(this.dataSource)
      .then(result => {
      	this._widgets = result.body;
        this.emitChange();
      });
  }

  get widgets() {
    return this._widgets;
  }

  get maxKey() {
  	var max = 0;
    this._widgets.forEach(x => x.key > max ? max = x.key : max = max);
    return max;
  }

  save(){
    this.transport
      .put(this.dataSource, this._widgets)
      .then(result => {
        this.emitChange();
      })
      .catch(e => console.log(e));
  }

  [messenger.ev(widgetActions.add)](widget){
    var nextKey = this.maxKey + 1;
    widget.key = nextKey;
    this._widgets.push(widget);

    this.save();
  }

  [messenger.ev(widgetActions.remove)](key){
    this._widgets = this._widgets.filter(x => x.key !== key);
    this.save();
  }
}
