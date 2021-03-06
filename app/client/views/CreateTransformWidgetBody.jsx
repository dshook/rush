import React from 'react';
import WidgetActions from '../actions/WidgetActions';

export default class CreateTransformWidgetBody extends React.Component {
  static propTypes = {
    di: React.PropTypes.func,
    widgetProviders: React.PropTypes.array,
    widgetRole: React.PropTypes.string,
    widgetPosition: React.PropTypes.number,
    onAdd: React.PropTypes.func
  }
  constructor(props){
    super(props);
  }

  handleAdd(widgetType){
    WidgetActions.addWidget(widgetType, this.props.widgetRole, this.props.widgetPosition);
    this.props.onAdd();
  }

  render() {
    return (
      <div className="modal-widget">
        {this.props.widgetProviders.map(function(item) {
          var boundClick = this.handleAdd.bind(this, item);
          return (
            <div onClick={boundClick} key={item.name} className="widget-type">
              <span>{item.name}</span>
            </div>
          );
        }, this)}
      </div>
    );
  }
}
