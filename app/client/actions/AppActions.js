import messenger from '../messenger/AppMessenger';

const startAction = 'App: Start';

module.exports = {
	startAction,
  start() {
    messenger.trigger(startAction);
  },
};