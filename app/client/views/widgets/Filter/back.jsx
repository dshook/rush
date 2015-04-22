import React from 'react';
import WidgetActions from '../../../actions/WidgetActions.js';
import AppActions from '../../../actions/AppActions.js';
import forms from 'newforms';
import FilterForm from './form.jsx';
import Preview from '../../Preview.jsx';

export default class Filter extends React.Component {
  constructor(props){
    super(props);
    this.state = props.widget;

    this.saveConfig = this.saveConfig.bind(this);
    this.previewWidget = this.previewWidget.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.previewWidget();
  }

  saveConfig(){
    var FilterForm = this.refs.FilterForm.getForm();
    if(FilterForm.validate()){
      var data = FilterForm.cleanedData;

      return new Promise((resolve) => {
        this.setState({config: data}, function(){
          WidgetActions.updateWidget(this.state);
          resolve();
        });
      });
    }
    return Promise.resolve();
  }

  previewWidget(){
    this.saveConfig()
      .then(() => AppActions.preview(this.props.widget.key));
  }

  submit(e){
    e.preventDefault();
    this.saveConfig()
      .then(() => this.props.onClose());
  }

  render() {
    return (
      <div className="modal-widget">
        <h3>{this.state.name}</h3>
        <form onSubmit={this.submit} onChange={this.previewWidget}>
          <forms.RenderForm
            initial={this.state.config}
            form={FilterForm}
            ref="FilterForm" />
          <button type="submit" className="button button--action" >
            <i className="fa fa-save"></i>
            Save
          </button>
        </form>
        <Preview {...this.props} />
      </div>
    );
  }
}
