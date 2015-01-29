var React        = require('react');
var VanillaModal = require('vanilla-modal');
var $            = require('jquery');

module.exports = {
  componentWillMount: function() {
    this._modal = null;
    this._id ='temp-modal'; 
    this._reactId ='temp-react-modal'; 
  },
  openModal: function(component, props = {}) {
    //create new div on the page
    var $modalDiv = $('.wrapper')
      .append(`<div class="modal-container" id="${this._id}"><div id="${this._reactId}"></div></div>`);

    //then throw it into the modal
    this._modal = new VanillaModal({onClose: this.closeModal});
    this._modal.open('#' + this._id);

    //the react it up
    var modalComponent = React.createFactory(component);
    var modalContent 
      = React.render(modalComponent(props), document.getElementById(this._reactId));

  },
  closeModal: function() {
    React.unmountComponentAtNode(document.getElementById(this._reactId));
    $('#' + this._id).remove();
    if(this._modal){
      this._modal.destroy();
      delete this._modal;
    }
  },
  componentWillUnmount: function() {
    this.closeModal();
  }

};
