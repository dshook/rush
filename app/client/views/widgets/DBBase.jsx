import React from 'react';
import Widget from 'shared/models/widget.js';
import WidgetActions from 'client/actions/WidgetActions.js';
import forms from 'newforms';
import ConnectionForm from './ConnectionForm.jsx';
import QueryForm from './QueryForm.jsx';
import SaveButton from 'client/views/SaveButton.jsx';

export default class DBBase extends React.Component {
  static propTypes = {
    widget: React.PropTypes.instanceOf(Widget),
    onClose: React.PropTypes.func
  }

  constructor(props){
    super(props);
    this.state = props.widget;

    this.saveWidget = this.saveWidget.bind(this);
  }

  saveWidget(e){
    e.preventDefault();

    var connectionForm = this.refs.connectionForm.getForm();
    var queryForm = this.refs.queryForm.getForm();
    if(connectionForm.validate() && queryForm.validate()){
      var data = connectionForm.cleanedData;
      data.query = queryForm.cleanedData.query;

      this.setState({config: data}, function(){
        WidgetActions.updateWidget(this.state);
        this.props.onClose();
      });
    }
  }

  render() {
    return (
      <div className="modal-widget">
        <h3>{this.state.name}</h3>
        <form onSubmit={this.saveWidget}>
          <forms.RenderForm
            initial={this.state.config}
            form={ConnectionForm}
            ref="connectionForm" />
          <forms.RenderForm
            initial={{query: this.state.config.query}}
            form={QueryForm}
            ref="queryForm" />
          <SaveButton />
        </form>
      </div>
    );
  }
}
