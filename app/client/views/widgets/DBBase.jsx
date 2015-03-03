import React from 'react';
import WidgetActions from '../../actions/WidgetActions.js';
import forms from 'newforms';
import ConnectionForm from './forms/Connection.jsx';
import QueryForm from './forms/Query.jsx';

export default class DBBase extends React.Component {
  constructor(props){
    super(props);
    this.state = props.widget;

    this.saveWidget = this.saveWidget.bind(this);
  }

  saveWidget(e){
    e.preventDefault();

    var connectionForm = this.refs.connectionForm.getForm();
    var queryForm = this.refs.queryForm.getForm() ;
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
          <button type="submit" className="button button--action" >
            <i className="fa fa-save"></i>
            Save
          </button>
        </form>
      </div>
    );
  }
}
