var Dispatcher = require('../dispatcher/AppDispatcher');
var BaseStore  = require('./BaseStore');
var $          = require('jQuery');

class WidgetStore extends BaseStore{
	constructor(){
    super();

    this.dataSource = '/api/widgets';
    this._widgets = [];

    $.get(this.dataSource, result => {
    	this._widgets = result;
      this.emitChange();
    });

    Dispatcher.on('addWidget', this, this.add);
    Dispatcher.on('removeWidget', this, this.remove);
	}

  get widgets() {
    return this._widgets;
  }

  get maxKey() {
  	var max = 0;
    this._widgets.forEach(x => x.key > max ? max = x.key : max = max);
    return max;
  }

  add(widget){
    var nextKey = this.maxKey + 1;
    widget.key = nextKey;
    this._widgets.push(widget);
    this.emitChange();
  }

  remove(key){
    this._widgets = this._widgets.filter(x => x.key !== key);
    this.emitChange();
  }
}

module.exports = new WidgetStore();