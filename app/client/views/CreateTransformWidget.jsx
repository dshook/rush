import React from 'react';
import Modal from './mixins/Modal.jsx';
import ModalBody from './CreateTransformWidgetBody.jsx';
import {WidgetTypeStore, change} from '../stores/WidgetTypeStore.js';
import messenger from '../messenger/AppMessenger';

module.exports = React.createClass({
  mixins: [Modal],


  getInitialState() {
    return this.getState();
  },

  getState() {
    return {
        widgetTypes: this.props.widgetTypeStore.widgetTypes
    };
  },

  [messenger.ev(change)](){
    this.setState(this.getState());
  },

  componentDidMount() {
    messenger.bindInstance(this);
  },

  componentWillUnmount() {
    messenger.unbindInstance(this);
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
