import messenger from 'client/messenger/AppMessenger';

const add = 'Widget: Add';
const update = 'Widget: Update';
const remove = 'Widget: Remove';

module.exports = {
  add,
  remove,
  update,

  addWidget(widgetType, widgetRole, widgetPosition) {
    messenger.trigger(add, {widgetType, widgetRole, widgetPosition});
  },

  updateWidget(widget) {
    messenger.trigger(update, widget);
  },

  removeWidget(id){
    messenger.trigger(remove, id);
  }
};
