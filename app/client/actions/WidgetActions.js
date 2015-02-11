var messenger = require('../messenger/AppMessenger');

var add = Symbol('Widget: Add');
var remove = Symbol('Widget: Remove');

module.exports = {
  add: add,
  remove: remove,

  addWidget(widgetType) {
    messenger.trigger(add, {name: widgetType});
  },

  removeWidget(id){
    messenger.trigger(remove, id);
  }
};