import messenger from '../messenger/AppMessenger';

var add = 'Widget: Add';
var remove = 'Widget: Remove';

module.exports = {
  add: add,
  remove: remove,

  addWidget(widgetType) {
    messenger.trigger(add, widgetType);
  },

  removeWidget(id){
    messenger.trigger(remove, id);
  }
};