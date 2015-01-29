var React        = require('react');
var VanillaModal = require('vanilla-modal');
var $            = require('jquery');

module.exports = {
  componentWillMount: function() {
    this._modal = null;
    this._id ='temp-modal'; 
  },
  openModal: function(component, props) {
    //create new div on the page
    var $modalDiv = $('.modal')
      .append(`<div class="modal-container" id="${this._id}"></div>`);

    //then throw it into the modal
    this._modal = new VanillaModal();
    this._modal.open('#' + this._id);

    //the react it up
    var modalComponent = React.createFactory(component);
    var modalContent 
      = React.render(modalComponent(props), document.getElementById(this._id));

  },
  closeModal: function() {
    React.unmountComponentAtNode(document.getElementById(this._id))
    $('#' + this._id).remove();
    this._modal.destroy();
    delete this._modal;
  },
  componentWillUnmount: function() {
    this.closeModal();
  }

};
