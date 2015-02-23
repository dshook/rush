import React from 'react';
import Modal from './mixins/Modal.jsx';
import ModalBody from './TransformWidgetBody.jsx';
import WidgetActions from '../actions/WidgetActions';

module.exports = React.createClass({
  mixins: [Modal],
  open(){
    this.openModal(ModalBody);
  },

  remove(e){
    WidgetActions.removeWidget(this.props.reactKey);
    e.stopPropagation();
  },

  render() {
    return (
      <div className="transform-widget" onClick={this.open}>
        <p>Name {this.props.name}</p>
        <button className="remove button button--remove" onClick={this.remove}>
          <span>Remove</span>
        </button>
      </div>
    );
  }
});
