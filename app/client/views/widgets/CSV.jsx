import React from 'react';
import WidgetActions from '../../actions/WidgetActions.js';
import forms from 'newforms';
import CSVForm from './forms/CSV.jsx';

export default class DBBase extends React.Component {
  constructor(props){
    super(props);
    this.state = props.widget;

    this.saveWidget = this.saveWidget.bind(this);
  }

  saveWidget(e){
    e.preventDefault();

    var csvForm = this.refs.csvForm.getForm();
    if(csvForm.validate()){
      var data = csvForm.cleanedData;

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
            form={CSVForm} 
            ref="csvForm" />
          <button type="submit" className="button button--action" >
            <i className="fa fa-save"></i>
            Save
          </button>
        </form>
      </div>
    );
  }
}
