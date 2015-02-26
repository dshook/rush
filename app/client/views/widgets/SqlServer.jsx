import React from 'react';
import WidgetActions from '../../actions/WidgetActions.js';
import forms from 'newforms';
import ConnectionForm from './forms/Connection.jsx';
import QueryForm from './forms/Query.jsx';

export default class SqlServer extends React.Component {
  constructor(props){
    super(props);
    this.state = props.widget;

    this.saveWidget = this.saveWidget.bind(this);
  }

  saveWidget(e){
    e.preventDefault();

    var form = this.refs.connectionForm.getForm();
    var data = form.cleanedData;

    var query = this.refs.queryForm.getForm().cleanedData.query;

    this.setState({config: data, query}, function(){
      WidgetActions.updateWidget(this.state);
      this.props.onClose();
    });

  }

  render() {
    return (
      <div className="modal-widget">
        <h3>{this.props.name}</h3>
        <form onSubmit={this.saveWidget}>
          <forms.RenderForm 
            initial={this.state.config} 
            form={ConnectionForm} 
            ref="connectionForm" />
          <forms.RenderForm 
            initial={{query: this.state.query}} 
            form={QueryForm} 
            ref="queryForm" />
          <button type="submit" className="button button--action" >
            <i className="fa fa-save"></i>
            Save
          </button>
        </form>
      </div>
    );
  }
}
