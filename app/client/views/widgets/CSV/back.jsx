import React from 'react';
import Widget from 'shared/models/widget.js';
import WidgetActions from 'client/actions/WidgetActions.js';
import AppActions from 'client/actions/AppActions.js';
import forms from 'newforms';
import CSVForm from './form.jsx';
import Preview from 'client/views/Preview.jsx';
import SaveButton from 'client/views/SaveButton.jsx';

export default class CSVBack extends React.Component {
  static propTypes = {
    widget: React.PropTypes.instanceOf(Widget),
    onClose: React.PropTypes.func
  }

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
    var csvForm = this.refs.csvForm.getForm();
    if(csvForm.validate()){
      var data = csvForm.cleanedData;

      //hopefully a newform update will make this cleaner
      if(this.refs.fileUpload){
        var file = this.refs.fileUpload.getDOMNode();
        data.fileUpload = file.files[0];
      }else{
        data.file = this.state.config.file;
      }

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
    var fileUpload;
    if(this.state.config.file){
      fileUpload = <p>{this.state.config.file.originalname}</p>;
    }else{
      fileUpload = <input type="file" ref="fileUpload"/>;
    }

    return (
      <div className="modal-widget">
        <h3>{this.state.name}</h3>
        <form encType="multipart/form-data" onChange={this.previewWidget} onSubmit={this.submit}>
          <label>File:</label>
          {fileUpload}
          <forms.RenderForm
            initial={this.state.config}
            form={CSVForm}
            ref="csvForm" />
          <SaveButton />
        </form>
        <Preview />
      </div>
    );
  }
}
