import React from 'react';
import Modal from './mixins/Modal.jsx';
import WidgetBodies from './WidgetBodies.js';
import WidgetActions from '../actions/WidgetActions';

module.exports = React.createClass({
  mixins: [Modal],
  open(){
    var modalProps = {
      onClose: this.onClose,
      widget: this.props.widget
    };
    this.openModal(WidgetBodies.getView(this.props.widget.provider), modalProps);
  },

  remove(e){
    WidgetActions.removeWidget(this.props.widget.key);
    e.stopPropagation();
  },

  onClose(){
    this.closeModal();
  },

  render() {
    return (
      <div className="transform-widget" onClick={this.open}>
        <div className="header">
          <span>{this.props.index}</span>
          <button className="remove button" onClick={this.remove}>
            <span>X</span>
          </button>
        </div>
        <p>{this.props.widget.name}</p>
      </div>
    );
  }
});
