var Dispatcher = require('flux').Dispatcher;
var EventEmitter = require('events').EventEmitter;

var EVENT = 'dispatch';
var emitter = new EventEmitter();

var Dispatcher = {
  dispatch(event) {
    emitter.emit(EVENT, event);
  },

  emit(ev){
    var remainingArgs = Array.prototype.slice.call(arguments, 1);
    emitter.emit(ev, ...remainingArgs);
  },

  on(ev, context, fn){
    emitter.on(ev, fn.bind(context));
  },

  subscribe(fn){
    var handler
    emitter.on(EVENT, fn);
    return {
      remove() {
        emitter.removeListener(EVENT, fn);
      }
    };
  },
};

module.exports = Dispatcher;
