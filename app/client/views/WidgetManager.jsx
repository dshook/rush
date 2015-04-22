import React from 'react';
import BaseView from './BaseView.js';
import CreateTransformWidget from './CreateTransformWidget.jsx';
import TransformWidget from './TransformWidget.jsx';
import {WidgetStore, change} from '../stores/WidgetStore';
import messenger from '../messenger/AppMessenger.js';
import _ from 'lodash';

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

  renderWidget(widget, index){
    return (
      <div className={'widget-role ' + widget.role}>
        <span>{widget.role}</span>
        <div
          className="widget-container"
          draggable="true"
          onDragStart={this.dragStart}
          onDragEnd={this.dragEnd}
        >
          <TransformWidget
            widget={widget}
            key={widget.key}
            index={index + 1}
            stores={this.props.stores}
          />
        </div>
      </div>
    );
  }

  renderTransformAdd(position){
    return (
      <div className='widget-role create'>
        <span></span>
        <CreateTransformWidget
          widgetProviderStore={this.props.stores.widgetProviderStore}
          widgetRole="transform"
          widgetPosition={position}
        />
      </div>
    );
  }

  render() {
    var hasSource = _.any(this.state.widgets, w => w.role === 'source');
    var hasDest   = _.any(this.state.widgets, w => w.role === 'dest');

    //Add a create transform for source if needed
    if(!hasSource){
      var createSource =
        <div className='widget-role source'>
          <span>Source</span>
          <CreateTransformWidget
            widgetProviderStore={this.props.stores.widgetProviderStore}
            widgetRole="source"
            widgetPosition={0}
          />
        </div>;
    }

    //Add a create destination if needed
    if(!hasDest){
      var destSource =
        <div className='widget-role dest'>
          <span>Destination</span>
          <CreateTransformWidget
            widgetProviderStore={this.props.stores.widgetProviderStore}
            widgetRole="dest"
            widgetPosition={this.state.widgets.length}
          />
        </div>;
    }

    var renderedWidgets = [];

    for(let i = 0; i < this.state.widgets.length; i++){
      var widget = this.state.widgets[i];
      renderedWidgets.push(
        this.renderWidget(widget, i)
      );
      if(widget.role !== 'dest'){
        renderedWidgets.push(
          this.renderTransformAdd(i + 1)
        );
      }
    }

    return (
      <div className="widgets">
        {createSource}
        {renderedWidgets.map( item => ({item}) )}
        {destSource}
      </div>
    );
  }
}
