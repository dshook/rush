import widgetActions from '../actions/WidgetActions';
import messenger from '../messenger/AppMessenger';
import BaseStore from './BaseStore';
import Widget from '../../shared/models/widget.js';
import Mapper from '../../shared/lib/mapper/';

export var change = 'WidgetStore: Change';

export class WidgetStore extends BaseStore{
	constructor(transport){
    super();

    this.change = change;
    this.messenger = messenger;    
    this.transport = transport;

    this.dataSource = '/api/widgets';
    this._widgets = [];

    let widgetMapper = new Mapper(Widget);
    this.transport
      .get(this.dataSource)
      .then(result => {
      	this._widgets = widgetMapper.toMany(result.body);
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

  [messenger.ev(widgetActions.add)](widgetType){
    var w = new Widget();
    w.name = widgetType;
    w.provider = widgetType;
    w.key =  this.maxKey + 1;
    this._widgets.push(w);

    this.save();
  }

  [messenger.ev(widgetActions.remove)](key){
    this._widgets = this._widgets.filter(x => x.key !== key);
    this.save();
  }
}

