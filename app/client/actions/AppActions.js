import messenger from 'client/messenger/AppMessenger';
import _ from 'lodash';

const startAction = 'App: Start';
const previewAction = 'App: Preview';
const clearPreviewAction = 'App: Clear Preview';

module.exports = {
	startAction,
  previewAction,
  clearPreviewAction,
  start() {
    messenger.trigger(startAction);
  },
  preview(widgetKey){
    _.debounce(() => {
      messenger.trigger(previewAction, widgetKey);
    }, 300)();
  },
  clearPreview(){
    messenger.trigger(clearPreviewAction);
  }
};
