import React from 'react';
import WidgetActions from '../../actions/WidgetActions.js';

export default class SqlServer extends React.Component {
  constructor(props){
    super(props);
    this.state = props.widget;

    this.saveWidget = this.saveWidget.bind(this);
  }

  saveWidget(){
    var data = {
      user     : this.refs.user.getDOMNode().value,
      password : this.refs.password.getDOMNode().value,
      server   : this.refs.server.getDOMNode().value,
      database : this.refs.database.getDOMNode().value,
    };
    var query = this.refs.query.getDOMNode().value;
    this.setState({config: data, query}, function(){
      WidgetActions.updateWidget(this.state);
      this.props.onClose();
    });

  }

  render() {
    return (
      <div className="modal-widget">
        <h3>{this.props.name}</h3>
        <label>
          User 
          <input type="text" ref="user" defaultValue={this.state.config.user} />
        </label>
        <label>
          Password 
          <input type="password" ref="password" defaultValue={this.state.config.password} />
        </label>
        <label>
          Server 
          <input type="text" ref="server" defaultValue={this.state.config.server} />
        </label>
        <label>
          Database 
          <input type="text" ref="database" defaultValue={this.state.config.database} />
        </label>
        <label>
          Query
          <textarea ref="query" defaultValue={this.state.query} />
        </label>
        <button onClick={this.saveWidget} className="button button--action" >
          <i className="fa fa-save"></i>
          Save
        </button>
      </div>
    );
  }
}
