import React from 'react';
import BaseView from './BaseView.js';
import CreateTransformWidget from './CreateTransformWidget.jsx';
import TransformWidget from './TransformWidget.jsx';
import {WidgetStore, change} from '../stores/WidgetStore';
import messenger from '../messenger/AppMessenger.js';

export default class WidgetManager extends BaseView {
  constructor(props) {
    super(props);

    this.widgetStore = props.stores.widgetStore;
    this.state = this.getState();
  }

  getState() {
    return {
        widgets: this.widgetStore.widgets
    };
  }

  [messenger.ev(change)](){
    this.setState(this.getState());
  }

  renderWidget(widget, index){
    return (
      <TransformWidget widget={widget} key={widget.key} index={index + 1} />
    );
  }

  render() {
    return (
      <div className="widgets">
        {this.state.widgets.map(this.renderWidget)}
        <CreateTransformWidget widgetProviderStore={this.props.stores.widgetProviderStore} />
      </div>
    );
  }
}
