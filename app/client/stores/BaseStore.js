import messenger from 'client/messenger/AppMessenger';

export default class BaseStore {

  constructor() {
    this.messenger = messenger;
    messenger.bindInstance(this);
  }

  emitChange(a, b) {
    this.messenger.trigger(this.change, a, b);
  }

}
