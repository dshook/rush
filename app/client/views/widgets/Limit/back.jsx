import React from 'react';
import WidgetActions from '../../../actions/WidgetActions.js';
import AppActions from '../../../actions/AppActions.js';
import forms from 'newforms';
import LimitForm from './form.jsx';
import Preview from '../../Preview.jsx';
import SaveButton from '../../SaveButton.jsx';

export default class Limit extends React.Component {
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
    var limitForm = this.refs.limitForm.getForm();
    if(limitForm.validate()){
      var data = limitForm.cleanedData;

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
            form={LimitForm}
            ref="limitForm" />
          <SaveButton />
        </form>
        <Preview {...this.props} />
      </div>
    );
  }
}
