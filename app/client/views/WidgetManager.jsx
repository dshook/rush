var React = require('react');
var CreateTransformWidget = require('./CreateTransformWidget.jsx');
var TransformWidget = require('./TransformWidget.jsx');

module.exports = React.createClass({
  getInitialState() {
    return {widgets: [{name: 'First Widget'}]};
  },
  
  renderWidget(widget){
    return <TransformWidget {...widget} />
  },

  addWidget(name){
    var widgets = this.state.widgets;
    widgets.push({name: name});
    this.setState({widgets: widgets});
  },

  render() {
    return (
      <div className="widgets">
        {this.state.widgets.map(this.renderWidget)}
        <CreateTransformWidget onAdd={this.addWidget} />
      </div>
    )
  }
});
