import React from 'react';
import Modal from './mixins/Modal.jsx';
import ModalBody from './CreateTransformWidgetBody.jsx';
import {change} from '../stores/WidgetProviderStore.js';
import messenger from '../messenger/AppMessenger';
import _ from 'lodash';

module.exports = React.createClass({
  mixins: [Modal],

  propTypes: {
    di: React.PropTypes.func,
    widgetRole: React.PropTypes.string,
    widgetPosition: React.PropTypes.number,
    onAdd: React.PropTypes.func
  },

  getInitialState() {
    return this.getState();
  },

  getState() {
    var widgetProviders = this.props.di('stores').widgetProviderStore.widgetProviders;
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
        widgetPosition: this.props.widgetPosition,
        onAdd: this.onAdd
      }
    );
  },

  render() {
    return (
      <div onClick={this.addClick} className={'transform-widget add ' +this.props.widgetRole}>
        <div className="content">
          <p title={'Add ' +this.props.widgetRole}><i className="fa fa-plus"></i>
            <span>Add {this.props.widgetRole}</span>
          </p>
        </div>
      </div>
    );
  }
});
