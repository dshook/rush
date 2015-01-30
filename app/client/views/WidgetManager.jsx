var React                 = require('react');
var CreateTransformWidget = require('./CreateTransformWidget.jsx');
var TransformWidget       = require('./TransformWidget.jsx');

module.exports = React.createClass({

  getInitialState() {
    return {
      dataSource: '/api/widgets',
      maxKey: null,
      widgets: []
    };
  },

  componentDidMount: function() {
    this.props.transport.get(this.state.dataSource)
      .then(result => {
        if (this.isMounted()) {
          this.setState(result.body);
        }
      });
  },
  
  renderWidget(widget){
    return <TransformWidget {...widget} reactKey={widget.key} remove={this.removeWidget} />
  },

  addWidget(name){
    var widgets = this.state.widgets;
    var nextKey = this.state.maxKey + 1;
    widgets.push({name: name, key: nextKey});
    this.setState({maxKey: nextKey, widgets: widgets});
  },

  removeWidget(key){
    var widgets = this.state.widgets.filter(x => x.key !== key);
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
