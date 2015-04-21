import React from 'react';
import Modal from './mixins/Modal.jsx';
import ModalBody from './CreateTransformWidgetBody.jsx';
import {change} from '../stores/WidgetProviderStore.js';
import messenger from '../messenger/AppMessenger';
import _ from 'lodash';

module.exports = React.createClass({
  mixins: [Modal],


  getInitialState() {
    return this.getState();
  },

  getState() {
    var widgetProviders = this.props.widgetProviderStore.widgetProviders;
    switch(this.props.widgetRole){
      case 'source':
        widgetProviders = _.filter(widgetProviders, p => p.isSource);
        break;
      case 'transform':
        widgetProviders = _.filter(widgetProviders, p => p.isTransform);
        break;
      case 'dest':
        widgetProviders = _.filter(widgetProviders, p => p.isDest);
        break;
    }
    return {
        widgetProviders: widgetProviders
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

  onAdd(){
    this.closeModal();
  },
  addClick(){
    this.openModal(ModalBody,
      {
        widgetProviders: this.state.widgetProviders,
        widgetRole: this.props.widgetRole,
        onAdd: this.onAdd
      }
    );
  },

  render() {
    return (
      <div onClick={this.addClick} className="transform-widget add">
        <div className="content">
          <p><i className="fa fa-plus"></i> Add {this.props.widgetRole}</p>
        </div>
      </div>
    );
  }
});
