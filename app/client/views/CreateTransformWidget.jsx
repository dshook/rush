import React from 'react';
import Modal from './mixins/Modal.jsx';
import ModalBody from './CreateTransformWidgetBody.jsx';

module.exports = React.createClass({
  mixins: [Modal],
  getInitialState() {
    return {widgetTypes: ['JSON', 'HTML']};
  },
  onAdd(name){
    this.closeModal();
  },
  addClick(){
    this.openModal(ModalBody, 
      {widgetTypes: this.state.widgetTypes, onAdd: this.onAdd}
    );
  },

  render() {
    return (
      <div onClick={this.addClick} className="transform-widget add">
        <p><i className="fa fa-plus"></i> Add</p>
      </div>
    )
  }
});
