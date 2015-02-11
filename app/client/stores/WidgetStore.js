var widgetActions = require('../actions/WidgetActions');
var event         = require('../messenger/Messenger').event;
var messenger     = require('../messenger/AppMessenger');
var BaseStore     = require('./BaseStore');
var $             = require('jQuery');

class WidgetStore extends BaseStore{
	constructor(){
    super();

    messenger.bindInstance(this);
    this.messenger = messenger;    
    this.change = change;

    this.dataSource = '/api/widgets';
    this._widgets = [];

    $.get(this.dataSource, result => {
    	this._widgets = result;
      this.messenger.trigger(this.change);
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

}

WidgetStore.prototype[event(widgetActions.add)] = function add(widget){
  var nextKey = this.maxKey + 1;
  widget.key = nextKey;
  this._widgets.push(widget);

  this.messenger.trigger(this.change);
}

WidgetStore.prototype[event(widgetActions.remove)] = function remove(key){
  this._widgets = this._widgets.filter(x => x.key !== key);
  this.messenger.trigger(this.change);
}

var change = Symbol('WidgetStore: Change');
WidgetStore.prototype[event(change)] = function change(){
}

module.exports = new WidgetStore();