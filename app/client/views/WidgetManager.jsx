import React from 'react';
import CreateTransformWidget from './CreateTransformWidget.jsx';
import TransformWidget from './TransformWidget.jsx';
import {WidgetStore, change} from '../stores/WidgetStore';
import messenger from '../messenger/AppMessenger.js';

export default class WidgetManager extends React.Component {
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

  componentDidMount() {
    messenger.bindInstance(this);
  }

  componentWillUnmount() {
    messenger.unbindInstance(this);
  }
  
  renderWidget(widget){
    return (
      <TransformWidget widget={widget} reactKey={widget.key} />
    );
  }

  render() {
    return (
      <div className="widgets">
        {this.state.widgets.map(this.renderWidget)}
        <CreateTransformWidget widgetTypeStore={this.props.stores.widgetTypeStore} />
      </div>
    );
  }
}
