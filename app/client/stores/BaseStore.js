import messenger from '../messenger/AppMessenger';

export default class BaseStore {

  constructor() {
    this.messenger = messenger;
    messenger.bindInstance(this);
  }

  emitChange(a, b) {
  	this.messenger.trigger(this.change, a, b);
  }

}
