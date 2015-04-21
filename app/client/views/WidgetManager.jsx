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


  dragStart(e){
    console.log(e);
    e.dataTransfer.effectAllowed = 'move';

    // Firefox requires calling dataTransfer.setData
    // for the drag to properly work
    e.dataTransfer.setData("text/html", null);
  }

  dragEnd(e){
    console.log(e);
  }

  renderWidget(widget, index, widgetArrayLength){
    var widgetTemplate =
        <TransformWidget
          widget={widget}
          key={widget.key}
          index={index + 1}
          stores={this.props.stores}
        />;
    var widgetType;
    switch(index){
      case 0:
        widgetType = "source";
        break;
      case widgetArrayLength - 1:
        widgetType = "destination";
        break;
      default:
        widgetType = "transform";
    }

    return (
      <div className={'widget-type ' + widgetType}>
        <span>{widgetType}</span>
        <div
          className="widget-container"
          draggable="true"
          onDragStart={this.dragStart}
          onDragEnd={this.dragEnd}
        >
          {widgetTemplate}
        </div>
      </div>
    );
  }

  render() {
    var renderedWidgets = [];

    for(let i = 0; i < this.state.widgets.length; i++){
      renderedWidgets.push(
        this.renderWidget(this.state.widgets[i], i, this.state.widgets.length)
      );
    }
    return (
      <div className="widgets">
        {renderedWidgets}
        <CreateTransformWidget widgetProviderStore={this.props.stores.widgetProviderStore} />
      </div>
    );
  }
}
