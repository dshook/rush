var Dispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

class BaseStore {
  handleDispatch: (action: Object) => void;

  constructor() {
    //autobind(this);
    this._emitter = new EventEmitter();
    this.handleDispatch && Dispatcher.subscribe(this.handleDispatch);
  }

  emitChange(data) {
    this._emitter.emit(CHANGE_EVENT, {store: this, ...data});
  }

  subscribe(fn){
    this._emitter.on(CHANGE_EVENT, fn);

    return {
      remove: () => {
        this._emitter.removeListener(CHANGE_EVENT, fn);
      }
    };
  }
}

function autobind(object) {
  Object.getOwnPropertyNames(Object.getPrototypeOf(object))
  .forEach(prop => {
    if (
      typeof object[prop] === 'function' &&
      /^[A-Za-z]/.test(prop) &&
      prop !== 'constructor'
    ) {
      object[prop] = object[prop].bind(object);
      object[prop].store = object;
    }
  });
}

module.exports = BaseStore;