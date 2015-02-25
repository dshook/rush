import messenger from '../messenger/AppMessenger';

var add = 'Widget: Add';
var update = 'Widget: Update';
var remove = 'Widget: Remove';

module.exports = {
  add,
  remove,
  update,

  addWidget(widgetType) {
    messenger.trigger(add, widgetType);
  },

  updateWidget(widget) {
    messenger.trigger(update, widget);
  },

  removeWidget(id){
    messenger.trigger(remove, id);
  }
};