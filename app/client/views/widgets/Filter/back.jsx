import React from 'react';
import Widget from 'shared/models/widget.js';
import WidgetActions from 'client/actions/WidgetActions.js';
import AppActions from 'client/actions/AppActions.js';
import forms from 'newforms';
import FilterForm from './form.jsx';
import Preview from 'client/views/Preview.jsx';
import SaveButton from 'client/views/SaveButton.jsx';

export default class Filter extends React.Component {
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
    var filterForm = this.refs.filterForm.getForm();
    if(filterForm.validate()){
      var data = filterForm.cleanedData;

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
            ref="filterForm" />
          <SaveButton />
        </form>
        <Preview {...this.props} />
      </div>
    );
  }
}
