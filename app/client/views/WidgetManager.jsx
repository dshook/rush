var React                 = require('react');
var CreateTransformWidget = require('./CreateTransformWidget.jsx');
var TransformWidget       = require('./TransformWidget.jsx');
var WidgetStore           = require('../stores/WidgetStore');
var messenger             = require('../messenger/AppMessenger.js');

module.exports = React.createClass({

  getState() {
      return {
          widgets: WidgetStore.widgets
      };
  },
  
  getInitialState() {
    return this.getState();
  },

  [messenger.ev(WidgetStore.change)] : function(){
    this.setState(this.getState());
  },

  componentDidMount() {
    messenger.bindInstance(this);
  },

  componentWillUnmount() {
    messenger.unbindInstance(this);
  },
  
  renderWidget(widget){
    return <TransformWidget {...widget} reactKey={widget.key} />;
  },

  render() {
    return (
      <div className="widgets">
        {this.state.widgets.map(this.renderWidget)}
        <CreateTransformWidget />
      </div>
    );
  }
});
