import messenger from '../messenger/AppMessenger';

const add = 'Widget: Add';
const update = 'Widget: Update';
const remove = 'Widget: Remove';

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
