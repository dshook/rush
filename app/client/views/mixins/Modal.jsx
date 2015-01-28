var VanillaModal = require('vanilla-modal');

module.exports = {
  componentWillMount: function() {
    this.__modal = null;
  },
  openModal: function() {
    this.__modal = new VanillaModal();
    this.__modal.open.apply(null, arguments);
  },
  componentWillUnmount: function() {
    delete this.__modal;
  }

};
