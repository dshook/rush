import React from 'react';
import WidgetActions from '../actions/WidgetActions';

export default class CreateTransformWidgetBody extends React.Component {
  handleAdd(name){
    WidgetActions.addWidget(name);
    this.props.onAdd(name);
  }

  render() {
    return (
      <div className="modal-widget">
        {this.props.widgetTypes.map(function(item, i) {
          var boundClick = this.handleAdd.bind(this, item);
          return (
            <div onClick={boundClick} key={item} className="widget-type">
              <span>{item}</span>
            </div>
          );
        }, this)}
      </div>
    );
  }
}
