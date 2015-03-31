import messenger from '../messenger/AppMessenger';
import _ from 'lodash';

const startAction = 'App: Start';
const previewAction = 'App: Preview';

module.exports = {
	startAction,
  previewAction,
  start() {
    messenger.trigger(startAction);
  },
  preview(widgetKey){
    _.debounce(() => {
      messenger.trigger(previewAction, widgetKey);
    }, 300)();
  }
};
