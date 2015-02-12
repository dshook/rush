var messenger = require('../messenger/AppMessenger');

class BaseStore {

  constructor() {
    this.messenger = messenger;
    messenger.bindInstance(this);
  }

  emitChange(a, b) {
  	this.messenger.trigger(this.change, a, b);
  }

}

module.exports = BaseStore;