import React from 'react';
import WidgetActions from '../../actions/WidgetActions.js';
import forms from 'newforms';
import LimitForm from './forms/Limit.jsx';

export default class Limit extends React.Component {
  constructor(props){
    super(props);
    this.state = props.widget;

    this.saveWidget = this.saveWidget.bind(this);
  }

  saveWidget(e){
    e.preventDefault();

    var limitForm = this.refs.limitForm.getForm();
    if(limitForm.validate()){
      var data = limitForm.cleanedData;

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
            form={LimitForm}
            ref="limitForm" />
          <button type="submit" className="button button--action" >
            <i className="fa fa-save"></i>
            Save
          </button>
        </form>
      </div>
    );
  }
}
