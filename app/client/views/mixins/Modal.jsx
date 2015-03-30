import React from 'react';
import VanillaModal from 'vanilla-modal';
import $ from 'jquery';

module.exports = {
  componentWillMount: function() {
    this._modal = null;
    this._id = 'temp-modal';
    this._reactId = 'temp-react-modal';
  },
  openModal: function(component, props = {}) {
    //create new div on the page
    $('.wrapper')
      .append(`<div class="modal-container" id="${this._id}"><div id="${this._reactId}"></div></div>`);

    //then throw it into the modal
    this._modal = new VanillaModal({onClose: this.closeModal});
    this._modal.open('#' + this._id);

    //then react it up
    var modalComponent = React.createFactory(component);
    React.render(modalComponent(props), document.getElementById(this._reactId));

  },
  closeModal: function() {
    var modalDiv = document.getElementById(this._reactId);
    if(modalDiv){
      React.unmountComponentAtNode(modalDiv);
    }
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
