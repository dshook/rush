var React                 = require('react');
var CreateTransformWidget = require('./CreateTransformWidget.jsx');
var TransformWidget       = require('./TransformWidget.jsx');
var WidgetStore           = require('../stores/WidgetStore');

module.exports = React.createClass({

  getState() {
      return {
          widgets: WidgetStore.widgets
      }
  },
  
  getInitialState() {
    return this.getState();
  },

  componentDidMount() {
    WidgetStore.subscribe(() => this.setState(this.getState()));
  },
  
  renderWidget(widget){
    return <TransformWidget {...widget} reactKey={widget.key} />
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
