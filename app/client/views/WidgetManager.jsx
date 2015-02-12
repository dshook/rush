var React                 = require('react');
var CreateTransformWidget = require('./CreateTransformWidget.jsx');
var TransformWidget       = require('./TransformWidget.jsx');
var WidgetStore           = require('../stores/WidgetStore');
var ev                    = require('../messenger/Messenger.js').event;
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

  [ev(WidgetStore.change)] : function(){
    this.setState(this.getState());
  },

  componentDidMount() {
    messenger.bindInstance(this);
    //WidgetStore.subscribe(() => this.setState(this.getState()));
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
