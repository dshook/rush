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
        <p>{this.props.widget.name}</p>
        <button className="remove button button--remove" onClick={this.remove}>
          <span>Remove</span>
        </button>
      </div>
    );
  }
});
