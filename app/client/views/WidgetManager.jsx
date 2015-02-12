var React                 = require('react');
var CreateTransformWidget = require('./CreateTransformWidget.jsx');
var TransformWidget       = require('./TransformWidget.jsx');
var WidgetStore           = require('../stores/WidgetStore');
var messenger             = require('../messenger/AppMessenger.js');

export class WidgetManager extends React.Component {
  constructor(props) {
    super(props);

    this.widgetStore = props.stores.widgetStore;
    this.state = this.getState();
  }

  getState() {
    return {
        widgets: this.widgetStore.widgets
    };
  }
  
  [messenger.ev(this.widgetStore.change)](){
    this.setState(this.getState());
  }

  componentDidMount() {
    messenger.bindInstance(this);
  }

  componentWillUnmount() {
    messenger.unbindInstance(this);
  }
  
  renderWidget(widget){
    return <TransformWidget {...widget} reactKey={widget.key} />;
  }

  render() {
    return (
      <div className="widgets">
        {this.state.widgets.map(this.renderWidget)}
        <CreateTransformWidget />
      </div>
    );
  }
}
