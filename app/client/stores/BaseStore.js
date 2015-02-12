var messenger = require('../messenger/AppMessenger');

var CHANGE_EVENT = 'change';

class BaseStore {

  constructor() {
    this.messenger = messenger;
    messenger.bindInstance(this);
    this.change = CHANGE_EVENT;
  }

  emitChange(a, b) {
  	this.messenger.trigger(this.change, a, b);
  }

}

module.exports = BaseStore;