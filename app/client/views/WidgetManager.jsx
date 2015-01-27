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

  render() {
    return (
      <div className="widgets">
        {this.state.widgets.map(this.renderWidget)}
        <CreateTransformWidget />
      </div>
    )
  }
});
