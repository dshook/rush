import messenger from '../messenger/AppMessenger';

var startAction = 'App: Start';

module.exports = {
	startAction,
  start() {
    messenger.trigger(startAction);
  },
};