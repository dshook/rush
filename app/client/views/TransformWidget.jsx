import React from 'react';
import Modal from './mixins/Modal.jsx';
import WidgetBacks from './WidgetBacks.js';
import WidgetFronts from './WidgetFronts.js';
import WidgetActions from '../actions/WidgetActions';

module.exports = React.createClass({
  mixins: [Modal],
  open(){
    var modalProps = {
      onClose: this.onClose,
      widget: this.props.widget,
      stores: this.props.stores
    };
    this.openModal(WidgetBacks.getView(this.props.widget.provider), modalProps);
  },

  remove(e){
    WidgetActions.removeWidget(this.props.widget.key);
    e.stopPropagation();
  },

  onClose(){
    this.closeModal();
  },

  render() {
    var widgetFront = WidgetFronts.getView(this.props.widget.provider);
    return (
      <div
        className="transform-widget"
        onClick={this.open}>
        <div className="header">
          <span>{this.props.index}</span>
          <button className="remove button" onClick={this.remove}>
            <span>X</span>
          </button>
        </div>
        {React.createElement(widgetFront, this.props.widget)}
      </div>
    );
  }
});
