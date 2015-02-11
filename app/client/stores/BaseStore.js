var messenger = require('../messenger/AppMessenger');

var CHANGE_EVENT = 'change';

class BaseStore {

  constructor() {
    this.messenger = messenger;
    //autobind(this);
  }

  emitChange(data) {
  }

  subscribe(fn){
    this.messenger.setHandler(CHANGE_EVENT, fn);
  }
}

module.exports = BaseStore;