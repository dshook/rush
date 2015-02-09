var Dispatcher = require('../dispatcher/AppDispatcher');

module.exports = {
  addWidget(widgetType) {
    Dispatcher.emit('addWidget', {name: widgetType});
  },

  removeWidget(id){
    Dispatcher.emit('removeWidget', id);
  }
};