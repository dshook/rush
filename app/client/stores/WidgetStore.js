var widgetActions = require('../actions/WidgetActions');
var messenger     = require('../messenger/AppMessenger');
var BaseStore     = require('./BaseStore');

class WidgetStore extends BaseStore{
	constructor(transport){
    super();

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

  subscribe(fn){
    this.messenger.setHandler(this.change, fn);
  }

  [messenger.ev(widgetActions.add)](widget){
    var nextKey = this.maxKey + 1;
    widget.key = nextKey;
    this._widgets.push(widget);

    this.emitChange();
  }

  [messenger.ev(widgetActions.remove)](key){
    this._widgets = this._widgets.filter(x => x.key !== key);
    this.emitChange();
  }
}


module.exports = WidgetStore;